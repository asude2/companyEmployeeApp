function okTıklama(){
    const arrows=document.querySelectorAll('.fa-arrow-down, .fa-arrow-up')
    const calisanBilgi=document.querySelectorAll('.calisan-bilgi')
    arrows.forEach((arrow,index) => {
        arrow.onclick=()=>{
            const bilgi=calisanBilgi[index]
            console.log(bilgi)
            if(getComputedStyle(bilgi).display === "none"){
                bilgi.style.display="block"
                arrow.classList.remove('fa-arrow-down')
                arrow.classList.add('fa-arrow-up')
            }
            else{
                bilgi.style.display="none"
                arrow.classList.remove('fa-arrow-up')
                arrow.classList.add('fa-arrow-down')
            }
        }
    });

    const kaydetButtons=document.querySelectorAll('.kaydet')
    kaydetButtons.forEach(element => {
        element.addEventListener('mouseup',()=>{
            element.style.backgroundColor="white"
            element.style.color="black"
        })
        element.addEventListener('mousedown',()=>{
            element.style.backgroundColor="black"
            element.style.color="white"
        })
    });
    save()
}
okTıklama()

// //! çalışan ekleme işlemi
const sablon=document.querySelector('.calisanOrnek')
const yeniCalisan=document.querySelector('.liste')
const calisanEkle=document.querySelector('.calisanEkle')

calisanEkle.addEventListener('click',()=>{
    const yeniDiv=sablon.cloneNode(true)
    const degistirilebilirAlan=yeniDiv.querySelectorAll('span')
    degistirilebilirAlan.forEach(span=>span.textContent="")

    yeniCalisan.append(yeniDiv)
    okTıklama()
})
//! çalışan filtreleme işlemi
const filtreButton=document.querySelector('.calisanBul')
const filtreInput=document.querySelector('.filtrele')
const ara=document.querySelector('.ara')
// filtreButton.addEventListener('click',()=>{
//     filtreInput.style.display==="inline"
// })
filtreButton.addEventListener('click',()=>{
    const display=window.getComputedStyle(filtreInput).display
    const displayBul=window.getComputedStyle(ara).display

    if(display==="none"){
        filtreInput.style.display="block"
    }
    if(displayBul==="none"){
        ara.style.display="block"
    }
    else{
        filtreInput.style.display="none"
        ara.style.display="none"
    }
})

function compare(){
    const value=filtreInput.value.toLowerCase()
    const calisanlar=document.querySelectorAll('.calisanOrnek')

    calisanlar.forEach(calisan => {
        const ad=calisan.querySelector('.ad-soyad').innerText.toLowerCase()
        const email=calisan.querySelector('.calisan-email').innerText.toLowerCase()

        if(ad.includes(value) || email.includes(value)){
            calisan.style.display = "block"
            console.log("oldu")
        }
        else{
            calisan.style.display="none"
        }
    });
}

filtreInput.addEventListener('keydown',(e) => {
    if(e.key==='Enter') {
        compare()
    }
})

//!LOCAL STORAGE
function save(){
    const kaydetButtonDizi=document.querySelectorAll('.kaydet')
    const silButtonDizi=document.querySelectorAll('.delete')
    const isimDizi=document.querySelectorAll('.ad-soyad')
    const emailDizi=document.querySelectorAll('.email')
    const yasDizi=document.querySelectorAll('.yas')
    const maasDizi=document.querySelectorAll('.maas')
    
    kaydetButtonDizi.forEach((kaydet,index) => {
        kaydet.addEventListener('click',()=>{
            const isim=isimDizi[index]  
            const email=emailDizi[index]
            const yas=yasDizi[index]
            const maas=maasDizi[index]
            localStorage.setItem('ad-soyad'+index,isim.textContent)
            localStorage.setItem('email'+index,email.textContent)
            localStorage.setItem('yas'+index,yas.textContent)
            localStorage.setItem('maas'+index,maas.textContent)
        })
    });

    // Local Storage dan her bir çalışan silindiğinde indexler kayıyor ve sildiğimiz indexin üst indexleri de arayüzden siliniyor.
    // Bu yüzden indexlerde kaydırma işlemi yapıyoruz.
    document.addEventListener('click', function(e) {
        if (e.target.closest(".delete")) {
            const calisanDiv = e.target.closest(".calisanOrnek");
            if (calisanDiv) {
                const index = Array.from(calisanDiv.parentNode.children).indexOf(calisanDiv);    
                calisanDiv.remove()
                localStorage.removeItem('ad-soyad'+index);
                localStorage.removeItem('email'+index);
                localStorage.removeItem('yas'+index);
                localStorage.removeItem('maas'+index);
                // Silme sonrası localStorage daki verileri kaydırarak yeniden düzenliyoruz.
                let i = index+1;
                while (localStorage.getItem('ad-soyad'+i)) {
                    localStorage.setItem('ad-soyad'+(i-1), localStorage.getItem('ad-soyad'+i));
                    localStorage.setItem('email'+(i-1), localStorage.getItem('email'+i));
                    localStorage.setItem('yas'+(i-1), localStorage.getItem('yas'+i));
                    localStorage.setItem('maas'+(i-1), localStorage.getItem('maas'+i));
                    // Silinen öge sonrası boş kalan öğeyi de siliyoruz.
                    localStorage.removeItem('ad-soyad'+i);
                    localStorage.removeItem('email'+i);
                    localStorage.removeItem('yas'+i);
                    localStorage.removeItem('maas'+i);
                    i++;
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded',() => {
    const sablon=document.querySelector('.calisanOrnek')
    const liste=document.querySelector('.liste')
    let index=0
    const ilkCalisan= liste.querySelector('.calisanOrnek')

    while (localStorage.getItem('ad-soyad' + index)) {
        if (index===0 && ilkCalisan) {
            ilkCalisan.querySelector('.ad-soyad').textContent=localStorage.getItem('ad-soyad'+index)
            ilkCalisan.querySelector('.email').textContent=localStorage.getItem('email'+index)
            ilkCalisan.querySelector('.yas').textContent=localStorage.getItem('yas'+index)
            ilkCalisan.querySelector('.maas').textContent=localStorage.getItem('maas'+index)
            ilkCalisan.style.display='block'
        } else {
            const yeniDiv=sablon.cloneNode(true)
            yeniDiv.querySelector('.ad-soyad').textContent=localStorage.getItem('ad-soyad'+index)
            yeniDiv.querySelector('.email').textContent=localStorage.getItem('email'+index)
            yeniDiv.querySelector('.yas').textContent=localStorage.getItem('yas'+index)
            yeniDiv.querySelector('.maas').textContent=localStorage.getItem('maas'+index)
            yeniDiv.style.display='block'

            liste.appendChild(yeniDiv)
        }
        index++
    }
    okTıklama()
})










