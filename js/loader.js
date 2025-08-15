// loader.js
export async function loadPartial(id, url){
  const el = document.getElementById(id);
  if(!el) return;
  try{
    const res = await fetch(url, {cache:'no-cache'});
    if(!res.ok) return;
    el.innerHTML = await res.text();
  }catch(err){
    console.warn('Failed to load partial', url, err);
  }
}
