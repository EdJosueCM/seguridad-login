const App = (() => {
  const qs = sel => document.querySelector(sel);
  const byId = id => document.getElementById(id);
  const setText = (el, txt='') => { if(el) el.textContent = txt; };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const strengthScore = pwd => {
    let s=0;
    if(!pwd) return 0;
    if(pwd.length>=8) s++;
    if(/[A-Z]/.test(pwd)) s++;
    if(/[0-9]/.test(pwd)) s++;
    if(/[^A-Za-z0-9]/.test(pwd)) s++;
    return s;
  };

  const fakeAuth = async ({email,password})=>{
    await new Promise(r=>setTimeout(r,600));
    if(!emailRegex.test(email)||strengthScore(password)<2){
      throw new Error("Credenciales inválidas");
    }
    return {token:btoa(email),user:{email}};
  };

  let submitting=false;

  const init=()=>{
    byId("year").textContent=new Date().getFullYear();

    const form=byId("loginForm");
    const email=byId("email");
    const pwd=byId("password");
    const togglePwd=byId("togglePwd");
    const strength=byId("strength");
    const submitBtn=byId("submitBtn");

    togglePwd.addEventListener("click",()=>{
      const isPwd=pwd.type==="password";
      pwd.type=isPwd?"text":"password";
    });

    pwd.addEventListener("input",()=>{strength.value=strengthScore(pwd.value);});

    form.addEventListener("submit",async e=>{
      e.preventDefault();
      if(submitting) return;
      submitting=true;
      submitBtn.disabled=true;

      try{
        await fakeAuth({email:email.value,password:pwd.value});
        alert("¡Login exitoso! 🎉");
      }catch(err){
        alert(err.message);
      }finally{
        submitting=false;
        submitBtn.disabled=false;
      }
    });
  };

  document.addEventListener("DOMContentLoaded",init);
  return {init};
})();
