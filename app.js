const phases = [
  {title:"Terraform Fundamentals",weeks:"Week 1",summary:"Understand declarative infrastructure, providers, resources, configuration, state, and the core command lifecycle.",concepts:[["Infrastructure as Code","Describe desired infrastructure instead of scripting each imperative step."],["Providers","Plugins connect Terraform to APIs such as Docker, AWS, Google Cloud, and Azure."],["Plan","Terraform compares configuration, state, and provider-reported reality."]],challenge:"Predict what terraform plan will do before you run it.",code:"terraform version\nterraform init\nterraform fmt -recursive\nterraform validate\nterraform plan -var-file=environments/dev/terraform.tfvars"},
  {title:"State & Lifecycle",weeks:"Weeks 1–2",summary:"Learn why Terraform tracks resource identity, how drift appears, and what plan/apply/destroy actually change.",concepts:[["State","Maps Terraform resource addresses to managed infrastructure."],["Drift","Real infrastructure can differ from configuration and recorded state."],["Lifecycle","Plan, apply, re-plan, and destroy make infrastructure changes explicit."]],challenge:"Explain why the second plan after a clean apply should normally report no changes.",code:"terraform state list\nterraform show\nterraform output\nterraform destroy -var-file=environments/dev/terraform.tfvars"},
  {title:"Variables & Outputs",weeks:"Week 2",summary:"Model inputs, validation, environment-specific tfvars, locals, and useful outputs.",concepts:[["Variables","Typed inputs make configurations reusable."],["Validation","Reject invalid environment or replica choices early."],["Outputs","Expose useful values after infrastructure changes."]],challenge:"Change the NGINX port and predict whether Terraform updates or replaces the container.",code:"variable \"nginx_port\" {\n  type    = number\n  default = 8080\n}\n\noutput \"nginx_url\" {\n  value = \"http://localhost:\\${var.nginx_port}\"\n}"},
  {title:"Modules & for_each",weeks:"Week 3",summary:"Trace reusable modules, module inputs/outputs, and stable repeatable resource addressing.",concepts:[["Root module","The top-level configuration orchestrates the lab."],["Child module","modules/app encapsulates the whoami containers."],["for_each","Stable keys create predictable resource addresses."]],challenge:"Increase staging replicas from 2 to 3 and predict the new resource key before planning.",code:"for_each = {\n  for index in range(var.replicas) :\n  tostring(index + 1) => index\n}"},
  {title:"Environments & Team Workflows",weeks:"Weeks 3–4",summary:"Compare dev, staging, and prod inputs while learning why tfvars alone do not isolate state.",concepts:[["Dev","8080 + 1 app replica."],["Staging","8081 + 2 app replicas."],["Prod","8082 + 3 app replicas."]],challenge:"Explain why separate variable files do not automatically create separate Terraform state.",code:"terraform plan -var-file=environments/dev/terraform.tfvars\nterraform plan -var-file=environments/staging/terraform.tfvars\nterraform plan -var-file=environments/prod/terraform.tfvars"},
  {title:"CI, Quality & Security",weeks:"Week 4",summary:"Use formatting, validation, linting, scanning, lock files, and pull-request review as infrastructure quality gates.",concepts:[["CI","Automatically validates proposed Terraform changes."],["Security","Never commit cloud credentials or sensitive state."],["Review","A plan should be understood before apply."]],challenge:"Decide which checks should block a pull request and which should warn.",code:"terraform fmt -check -recursive\nterraform init -backend=false -input=false\nterraform validate -no-color"},
  {title:"AWS Fundamentals",weeks:"Weeks 5–6",summary:"Map Terraform concepts to AWS networking, IAM, storage, compute, registries, and eventually EKS.",concepts:[["Networking","VPC, subnets, routes, gateways, and security groups."],["Identity","IAM controls who and what can access resources."],["Workloads","EC2, containers, storage, and managed services."]],challenge:"Sketch a small network + compute lab before touching EKS.",code:"# Concept mapping\nDocker network -> AWS VPC\nPort rules    -> Security groups\nObject data   -> S3\nContainers    -> ECS/EKS"},
  {title:"Google Cloud Fundamentals",weeks:"Week 7",summary:"Translate the same infrastructure concepts into GCP projects, VPCs, IAM, storage, compute, registries, and GKE.",concepts:[["Project","Primary organizational and billing boundary."],["VPC network","Global network resource with regional subnetworks."],["GKE","Managed Kubernetes after identity/networking fundamentals."]],challenge:"Compare an AWS VPC design with the equivalent GCP network design.",code:"AWS VPC          -> GCP VPC network\nSecurity Group   -> Firewall rule\nS3               -> Cloud Storage\nECR              -> Artifact Registry\nEKS              -> GKE"},
  {title:"Azure Fundamentals",weeks:"Week 8",summary:"Learn subscriptions, tenants, resource groups, VNets, NSGs, RBAC, storage, compute, registries, and AKS.",concepts:[["Resource groups","Explicit lifecycle/organizational boundary for related Azure resources."],["VNet","Azure network boundary."],["RBAC","Role-based access over Azure resources."]],challenge:"Explain why resource groups are useful even when Terraform already tracks resources.",code:"AWS VPC        -> Azure VNet\nSecurity Group -> Network Security Group\nS3             -> Blob Storage\nECR            -> Azure Container Registry\nEKS            -> AKS"},
  {title:"Multi-Cloud + Kubernetes",weeks:"Weeks 9–10",summary:"Compare clouds deliberately, then learn the boundary between provisioning infrastructure and managing workloads.",concepts:[["Multi-cloud","Transfer concepts instead of memorizing three unrelated clouds."],["Terraform boundary","Provision infrastructure and clusters."],["Kubernetes boundary","Manage Deployments, Services, ConfigMaps, Secrets, and app lifecycle."]],challenge:"Design the same network + compute requirement in AWS, GCP, and Azure, then explain where Terraform should stop.",code:"Terraform\n   ↓\nCloud infrastructure / cluster\n   ↓\nKubernetes API\n   ↓\nDeployments • Services • ConfigMaps • Secrets"}
];

const envs = {
  dev:{name:"dev",nginx:8080,replicas:1,start:9000},
  staging:{name:"staging",nginx:8081,replicas:2,start:9100},
  prod:{name:"prod",nginx:8082,replicas:3,start:9200}
};

const state = {
  selected: Number(localStorage.getItem("tf-lab:selected") || 0),
  view: location.hash.startsWith("#phase-") ? "phase" : "dashboard",
  initialized: false,
  applied: false,
  plannedEnv: "dev",
  activeEnv: null
};

const $ = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];
const phaseKey = i => "tf-lab:phase:"+i;
const isComplete = i => localStorage.getItem(phaseKey(i)) === "done";

function progress(){
  const done = phases.filter((_,i)=>isComplete(i)).length;
  return Math.round((done/phases.length)*100);
}
function updateProgress(){
  const p=progress();
  $("#progress-label").textContent=p+"%";
  $("#progress-bar").style.width=p+"%";
  $$(".phase-status").forEach((el,i)=>el.classList.toggle("complete",isComplete(i)));
}
function renderNav(){
  $("#phase-navigation").innerHTML=phases.map((p,i)=>`
    <button class="phase-link ${state.view==="phase"&&state.selected===i?"active":""}" type="button" data-phase="${i}">
      <span class="phase-number">${String(i+1).padStart(2,"0")}</span>
      <span><strong>${p.title}</strong><small>${p.weeks}</small></span>
      <span class="phase-status ${isComplete(i)?"complete":""}" aria-hidden="true"></span>
    </button>`).join("");
  $$("[data-phase]").forEach(btn=>btn.addEventListener("click",()=>openPhase(Number(btn.dataset.phase))));
}
function showToast(message){
  const t=$("#toast");t.textContent=message;t.hidden=false;
  clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>t.hidden=true,1800);
}
function openDashboard(){
  state.view="dashboard";location.hash="dashboard";$("#dashboard-view").hidden=false;$("#phase-view").hidden=true;
  renderNav();renderDashboard();$("#sidebar").classList.remove("open");
}
function openPhase(i){
  state.selected=i;state.view="phase";localStorage.setItem("tf-lab:selected",String(i));location.hash="phase-"+(i+1);
  $("#dashboard-view").hidden=true;$("#phase-view").hidden=false;renderNav();renderPhase();$("#sidebar").classList.remove("open");
  $("#app-main").focus();
}
function renderDashboard(){
  const completeCount=phases.filter((_,i)=>isComplete(i)).length;
  $("#dashboard-view").innerHTML=`
    <section class="hero">
      <p class="eyebrow">Interactive infrastructure engineering lab</p>
      <h1>Learn Terraform by seeing the infrastructure change.</h1>
      <p>Practice professional Terraform concepts locally first, then map the same ideas across AWS, Google Cloud, Azure, and Kubernetes. The embedded terminal is a safe simulator — no credentials, no billable resources.</p>
      <div class="hero-actions">
        <button class="primary" type="button" id="start-course">Start / continue lab</button>
        <a class="secondary" href="#terminal">Open simulator ↓</a>
      </div>
    </section>
    <div class="stats">
      <div class="stat"><strong>10</strong><span>learning phases</span></div>
      <div class="stat"><strong>3</strong><span>cloud providers compared</span></div>
      <div class="stat"><strong>${completeCount}/10</strong><span>phases completed</span></div>
      <div class="stat"><strong>0</strong><span>cloud credentials required</span></div>
    </div>

    <div class="section-head"><div><h2>Current local architecture</h2><p>The real repository provisions this Docker-based lab with Terraform.</p></div></div>
    <div class="panel">
      <div class="architecture">
        <div class="node"><strong>Terraform</strong><span>desired state</span></div><div class="arrow">→</div>
        <div class="node"><strong>Docker network</strong><span>isolated lab network</span></div><div class="arrow">→</div>
        <div class="node"><strong>NGINX + whoami</strong><span>environment-driven containers</span></div>
      </div>
    </div>

    <div class="section-head"><div><h2>Learning path</h2><p>Move from local mechanics to multi-cloud architecture intentionally.</p></div></div>
    <div class="phase-grid">${phases.map((p,i)=>`
      <article class="phase-card" data-open-phase="${i}" tabindex="0">
        <div class="phase-card-top"><span class="badge">Phase ${i+1}</span><span class="check ${isComplete(i)?"complete":""}">${isComplete(i)?"✓ Complete":"○ In progress"}</span></div>
        <h3>${p.title}</h3><p>${p.summary}</p>
      </article>`).join("")}</div>

    <div class="section-head" id="terminal"><div><h2>Terraform browser CLI</h2><p>Stateful simulation backed by the exact dev/staging/prod values in this repository.</p></div></div>
    <div class="dashboard-grid">
      <div>
        <div class="terminal-shell">
          <div class="terminal-head"><strong>tee@terraform-lab</strong><div class="terminal-status"><span class="terminal-dot ok"></span><span class="terminal-dot"></span><span class="terminal-dot"></span></div></div>
          <div id="terminal-output" class="terminal-output" aria-live="polite"></div>
          <form id="terminal-form" class="terminal-form">
            <span class="prompt">$</span><input id="terminal-input" class="terminal-input" autocomplete="off" spellcheck="false" aria-label="Terraform simulator command" placeholder="terraform init" />
          </form>
        </div>
        <div class="quick-commands">
          ${["help","terraform init","terraform validate","terraform plan -var-file=environments/dev/terraform.tfvars","terraform apply -var-file=environments/dev/terraform.tfvars","terraform output","terraform destroy -var-file=environments/dev/terraform.tfvars"].map(c=>`<button class="quick-command" type="button" data-command="${c}">${c}</button>`).join("")}
        </div>
      </div>
      <div class="panel">
        <h3>Simulation state</h3><p class="panel-copy">This reflects your commands in this browser session.</p>
        <div id="sim-state" style="margin-top:16px"></div>
      </div>
    </div>`;
  $("#start-course").addEventListener("click",()=>openPhase(state.selected));
  $$("[data-open-phase]").forEach(card=>{
    const go=()=>openPhase(Number(card.dataset.openPhase));
    card.addEventListener("click",go);card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" ")go()});
  });
  initTerminal();
}
function renderPhase(){
  const p=phases[state.selected];
  $("#phase-view").innerHTML=`
    <div class="phase-hero">
      <article class="phase-title">
        <span class="badge">Phase ${state.selected+1} • ${p.weeks}</span>
        <h1>${p.title}</h1><p>${p.summary}</p>
      </article>
      <article class="challenge-card"><p class="eyebrow">Challenge</p><h3>Prove you understand it</h3><p>${p.challenge}</p></article>
    </div>
    <div class="section-head"><div><h2>Core concepts</h2><p>Know what each piece is doing before you run the commands.</p></div></div>
    <div class="concept-grid">${p.concepts.map(c=>`<article class="concept"><strong>${c[0]}</strong><span>${c[1]}</span></article>`).join("")}</div>
    <div class="section-head"><div><h2>Command / configuration focus</h2><p>Use the repository locally for the real hands-on exercise.</p></div></div>
    <div class="code-card"><div class="code-card-head">Terraform learning reference</div><pre><code>${escapeHtml(p.code)}</code></pre></div>
    <div class="complete-row"><button id="complete-phase" class="complete-button" type="button">${isComplete(state.selected)?"✓ Completed":"Mark phase complete"}</button></div>`;
  $("#complete-phase").addEventListener("click",()=>{
    const done=isComplete(state.selected);
    if(done)localStorage.removeItem(phaseKey(state.selected));else localStorage.setItem(phaseKey(state.selected),"done");
    updateProgress();renderNav();renderPhase();showToast(done?"Phase reopened":"Phase complete ✓");
  });
}
function escapeHtml(v){return v.replace(/[&<>"]/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]))}
function termLine(text,kind=""){const out=$("#terminal-output");if(!out)return;const p=document.createElement("p");p.className="terminal-line "+kind;p.textContent=text;out.appendChild(p);out.scrollTop=out.scrollHeight}
function findEnv(command){
  if(command.includes("staging"))return "staging";if(command.includes("prod"))return "prod";return "dev";
}
function simState(){
  const el=$("#sim-state");if(!el)return;
  const env=state.activeEnv?envs[state.activeEnv]:envs[state.plannedEnv];
  el.innerHTML=`
    <div class="concept"><strong>Initialized</strong><span>${state.initialized?"Yes — providers ready":"No"}</span></div>
    <div class="concept" style="margin-top:8px"><strong>Last planned environment</strong><span>${state.plannedEnv}</span></div>
    <div class="concept" style="margin-top:8px"><strong>Applied infrastructure</strong><span>${state.applied?state.activeEnv+" • NGINX :"+env.nginx+" • "+env.replicas+" app replica(s)":"None"}</span></div>`;
}
function runCommand(raw){
  const cmd=raw.trim();if(!cmd)return;
  termLine("$ "+cmd,"command");
  if(cmd==="help"){
    termLine("Available: help, clear, ls, cat main.tf, terraform version, terraform init, terraform fmt, terraform validate, terraform plan -var-file=environments/{dev|staging|prod}/terraform.tfvars, terraform apply ..., terraform output, terraform state list, terraform destroy ...");
  } else if(cmd==="clear"){
    $("#terminal-output").innerHTML="";
  } else if(cmd==="ls"){
    termLine("main.tf  variables.tf  outputs.tf  providers.tf  versions.tf  environments/  modules/  docs/");
  } else if(cmd==="cat main.tf"){
    termLine('resource "docker_network" "app" { ... }\nresource "docker_container" "nginx" { ... }\nmodule "app" { source = "./modules/app" ... }');
  } else if(cmd==="terraform version"){
    termLine("Terraform v1.9.8\non linux_amd64","success");
  } else if(cmd.startsWith("terraform init")){
    state.initialized=true;termLine("Initializing provider plugins...\n- Reusing previous version of kreuzwerker/docker\n- Installing kreuzwerker/docker...\nTerraform has been successfully initialized!","success");
  } else if(cmd.startsWith("terraform fmt")){
    termLine("Formatting complete. No changes required.","success");
  } else if(cmd.startsWith("terraform validate")){
    if(!state.initialized)termLine("Error: provider plugins are not initialized. Run terraform init first.","error");
    else termLine("Success! The configuration is valid.","success");
  } else if(cmd.startsWith("terraform plan")){
    if(!state.initialized){termLine("Error: initialization required. Run terraform init first.","error");}
    else{
      const key=findEnv(cmd),e=envs[key];state.plannedEnv=key;
      const adds=3+e.replicas;
      termLine(`Planning environment: ${key}\n+ docker_network.app\n+ docker_image.nginx\n+ docker_container.nginx (: ${e.nginx})\n+ module.app.docker_image.whoami\n+ ${e.replicas} whoami container(s) starting at port ${e.start}\n\nPlan: ${adds+1} to add, 0 to change, 0 to destroy.`,"success");
    }
  } else if(cmd.startsWith("terraform apply")){
    if(!state.initialized){termLine("Error: initialization required. Run terraform init first.","error");}
    else{
      const key=findEnv(cmd),e=envs[key];state.plannedEnv=key;state.activeEnv=key;state.applied=true;
      termLine(`Applying simulated ${key} plan...\ndocker_network.app: Creation complete\ndocker_container.nginx: Creation complete\nmodule.app: ${e.replicas} app container(s) ready\n\nApply complete! Resources: ${4+e.replicas} added, 0 changed, 0 destroyed.`,"success");
    }
  } else if(cmd==="terraform output"||cmd.startsWith("terraform output ")){
    if(!state.applied){termLine("Warning: no simulated infrastructure has been applied yet.","warn");}
    else{
      const e=envs[state.activeEnv];const urls=Array.from({length:e.replicas},(_,i)=>`  "${i+1}" = "http://localhost:${e.start+i}"`).join("\n");
      termLine(`environment = "${state.activeEnv}"\nnginx_url = "http://localhost:${e.nginx}"\ndocker_network = "terraform-docker-lab-${state.activeEnv}-network"\napp_urls = {\n${urls}\n}`,"success");
    }
  } else if(cmd==="terraform state list"){
    if(!state.applied){termLine("No state entries. Apply the simulation first.","warn");}
    else{
      const e=envs[state.activeEnv];const apps=Array.from({length:e.replicas},(_,i)=>`module.app.docker_container.whoami["${i+1}"]`).join("\n");
      termLine(`docker_container.nginx\ndocker_image.nginx\ndocker_network.app\nmodule.app.docker_image.whoami\n${apps}`);
    }
  } else if(cmd.startsWith("terraform destroy")){
    if(!state.applied){termLine("No simulated resources to destroy.","warn");}
    else{termLine(`Destroying simulated ${state.activeEnv} infrastructure...\nDestroy complete! Resources removed.`,"success");state.applied=false;state.activeEnv=null;}
  } else {
    termLine("Command not recognized in the safe simulator. Type help to see supported commands.","error");
  }
  simState();
}
function initTerminal(){
  const out=$("#terminal-output");if(!out)return;
  out.innerHTML="";termLine("Terraform Infrastructure Lab simulator\nType help for supported commands. No real infrastructure will be created.","success");
  const form=$("#terminal-form"),input=$("#terminal-input");
  form.addEventListener("submit",e=>{e.preventDefault();runCommand(input.value);input.value="";});
  $$("[data-command]").forEach(b=>b.addEventListener("click",()=>{runCommand(b.dataset.command);input.focus();}));
  simState();
}

$("[data-nav='dashboard']").addEventListener("click",e=>{e.preventDefault();openDashboard()});
$("#mobile-menu").addEventListener("click",()=>$("#sidebar").classList.toggle("open"));
$("#reset-progress").addEventListener("click",()=>{phases.forEach((_,i)=>localStorage.removeItem(phaseKey(i)));updateProgress();renderNav();if(state.view==="dashboard")renderDashboard();else renderPhase();showToast("Progress reset");});
window.addEventListener("hashchange",()=>{if(location.hash==="#dashboard"||!location.hash)openDashboard();});
renderNav();updateProgress();
if(state.view==="phase"){const n=Number(location.hash.replace("#phase-",""))-1;if(Number.isInteger(n)&&n>=0&&n<phases.length)state.selected=n;openPhase(state.selected)}else openDashboard();
