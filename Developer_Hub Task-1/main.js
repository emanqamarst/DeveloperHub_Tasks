
function showPage(name){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const el = document.getElementById('page-'+name);
  if(el){ el.classList.add('active'); window.scrollTo(0,0); }
}
function doSearch(){ showPage('mobile'); }
function setImg(el,src){
  document.getElementById('mainImg').src=src;
  document.querySelectorAll('.thumb').forEach(t=>t.classList.remove('on'));
  el.classList.add('on');
}
function switchTab(btn,tab){
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  ['tdesc','trev','tship','tsell'].forEach(id=>{
    const el=document.getElementById(id);
    if(el) el.style.display=(id===tab)?'block':'none';
  });
}
document.addEventListener('click',function(e){
  if(e.target.classList.contains('wbtn')){
    e.stopPropagation();
    e.target.classList.toggle('on');
    e.target.textContent=e.target.classList.contains('on')?'♥':'♡';
  }
});
(function timer(){
  let d=4,h=13,m=34,s=56;
  setInterval(()=>{
    s--;if(s<0){s=59;m--;}if(m<0){m=59;h--;}if(h<0){h=23;d--;}if(d<0){d=h=m=s=0;}
    ['days','hours','minutes','seconds'].forEach((id,i)=>{
      const el=document.getElementById(id);
      if(el)el.textContent=String([d,h,m,s][i]).padStart(2,'0');
    });
  },1000);
})();

