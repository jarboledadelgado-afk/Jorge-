(async()=>{
  try{
    const base=['app00.b64','app01.b64','app02.b64','app03.b64','app04.b64'];
    let b='';
    for(const f of base){
      const r=await fetch('../universal-v06/'+f,{cache:'no-store'});
      if(!r.ok) throw new Error('No se pudo cargar '+f+' ('+r.status+')');
      b+=(await r.text()).trim();
    }
    let h=new TextDecoder().decode(Uint8Array.from(atob(b),c=>c.charCodeAt(0)));
    const pr=await fetch('patch.json',{cache:'no-store'});
    if(!pr.ok) throw new Error('No se pudo cargar patch.json ('+pr.status+')');
    const p=await pr.json();
    for(const o of [...p.ops].sort((a,b)=>b.start-a.start)) h=h.slice(0,o.start)+o.text+h.slice(o.end);

    // Algunos navegadores móviles (incluido Samsung Internet en ciertos contextos)
    // renderizan el HTML reconstruido pero no ejecutan de forma fiable los scripts
    // inline escritos después de un fetch asíncrono. Extraemos los scripts,
    // escribimos primero el documento y luego los ejecutamos explícitamente.
    const scripts=[];
    h=h.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi,(full,attrs,code)=>{
      scripts.push({attrs:attrs||'',code:code||''});
      return '';
    });

    document.open();
    document.write(h);
    document.close();

    for(const item of scripts){
      const s=document.createElement('script');
      const srcMatch=item.attrs.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
      if(srcMatch){
        s.src=srcMatch[1];
        s.async=false;
      }else{
        s.textContent=item.code;
      }
      (document.body||document.documentElement).appendChild(s);
    }
  }catch(e){
    document.body.innerHTML='<main style="font-family:system-ui;padding:20px"><h1>No se pudo cargar OREV v0.7 RC</h1><p>'+String(e)+'</p><p>Actualiza la página. Si continúa, informa de esta pantalla.</p></main>';
  }
})();