let yeniGorev = document.querySelector('.input-gorev')
let yeniGorevEkleBtn = document.querySelector('.btn-gorev-ekle')
let gorevListesi = document.querySelector('.gorev-listesi')

yeniGorevEkleBtn.addEventListener('click', gorevEkle)
gorevListesi.addEventListener('click', gorevSilTamamla)
document.addEventListener('DOMContentLoaded', localStorageOku)

function gorevSilTamamla(e) {
    let tiklanilanEleman = e.target

    if (tiklanilanEleman.classList.contains('gorev-btn-tamamlandi')) {
        tiklanilanEleman.parentElement.classList.toggle('gorev-tamamlandi')
    }

    if (tiklanilanEleman.classList.contains('gorev-btn-sil')) {
            if(confirm('Silmek İstediğinizden Eminmisiniz.')){
                tiklanilanEleman.parentElement.classList.toggle('kaybol')
                let silinecekgorev = tiklanilanEleman.parentElement.children[0].innerText
                localStorageSil(silinecekgorev)
                tiklanilanEleman.parentElement.addEventListener('transitionend', function()
                {
                    tiklanilanEleman.parentElement.remove()
                })
            }
    }
}
//görev ekleme fonksiyonu
function gorevEkle(e) {
    e.preventDefault()

    if(yeniGorev.value.length > 0){
        gorevItemOlustur(yeniGorev.value)
        //burada kaydetme fonksiyonunu çağırıyoruz
        localStorageKaydet(yeniGorev.value)
        yeniGorev.value = ''
    }
    else
    {
        alert('Lütfen Tanımlamak İstediğiniz Görevi yazınız.')
    }

}
//Girilen görevleri localstorage'a kaydediyoruz burada
function localStorageKaydet(yeniGorev)
{
    let gorevler = localStorageArrayDonustur()

    gorevler.push(yeniGorev)
    localStorage.setItem('gorevler', JSON.stringify(gorevler))
}
function localStorageOku()
{
    let gorevler = localStorageArrayDonustur()

    gorevler.forEach(function(gorev)
    {
        gorevItemOlustur(gorev)
    })
}
//görev ekleme ana merkez fonksiyonu
function gorevItemOlustur(gorev)
{
    //div oluşturma
    let gorevDiv = document.createElement('div')
    gorevDiv.classList.add('gorev-item')

    //li oluşturma
    let gorevli = document.createElement('li')
    gorevli.classList.add('gorev-tanim')
    gorevli.innerText = gorev
    gorevDiv.appendChild(gorevli)

    //tamamlandı butonu ekleme
    let gorevtamamBtn = document.createElement('button')
    gorevtamamBtn.classList.add('gorev-btn')
    gorevtamamBtn.classList.add('gorev-btn-tamamlandi')
    gorevtamamBtn.innerHTML = '<i class="far fa-check-square"></i>'
    gorevDiv.appendChild(gorevtamamBtn)

    //sil butonu ekleme
    let gorevSilBtn = document.createElement('button')
    gorevSilBtn.classList.add('gorev-btn')
    gorevSilBtn.classList.add('gorev-btn-sil')
    gorevSilBtn.innerHTML = '<i class="far fa-trash-alt"></i>'
    gorevDiv.appendChild(gorevSilBtn)

    //ul'ye oluşturulan divi ekleyelim
    gorevListesi.appendChild(gorevDiv)
}
//localstroge'dan silme işlemi
function localStorageSil(gorev)
{
    let gorevler = localStorageArrayDonustur()

    //splice ile item sil
    let silinecekElemanIndex = gorevler.indexOf(gorev)
    gorevler.splice(silinecekElemanIndex,1)

    localStorage.setItem('gorevler', JSON.stringify(gorevler))
}

//localstroge array yapma fonksiyonu
function localStorageArrayDonustur(){
    let gorevler

    if (localStorage.getItem('gorevler') === null) {
        gorevler = []
    }
    else
    {
        gorevler = JSON.parse(localStorage.getItem('gorevler'))
    }

    return gorevler
}