(function(){
    if(!process.env.DEV) return;
    const el= document.createElement('h1');
    el.classList.add('devDisplay');
    el.textContent = 'DEV MODE!'
    document.body.appendChild(el);
})();