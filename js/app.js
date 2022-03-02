/* phone search input  */
const phoneInput = document.getElementById('phone-input');
// phone result 
const phoneResult = document.getElementById('result')

const loading = (condition) => {
  document.getElementById("loading").style.display = condition;
}

const searchResult = () => {
  phoneValue = phoneInput.value;

  if (phoneValue == "") {
    phoneResult.innerHTML = '';
    alert("Please type your Favourite Phone !!")
    loading("none");
    document.getElementById("notext").style.display = "block";
  } else {
    loading('block');
    fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneValue.toLowerCase()}`)
      .then(res => res.json())
      .then(data => showData(data.data))
  }


}
// all phone in 20 slice 
const showData = (phone) => {



  const showPhonein20 = phone.slice(0, 20);
  phoneResult.textContent = '';
  phoneInput.value = '';
  showPhonein20.forEach(phone => {
    const div = document.createElement('div')
    div.innerHTML = `
      <div class="card-group  ">
         <div class="card g-col-3  gx-5">
         <img src="${phone.image}" class="card-img-top w-75 mx-auto text-center mt-3" alt="${phone.phone_name}">
         <div class="card-body">
           <h5 class="card-title text-center">${phone.phone_name}</h5>
           <h6 class="card-title text-center">${phone.brand}</h6>
           <div class='d-grid gap-2 mt-3'>
           <button onclick="modalShow('${phone.slug}')" class="btn btn-primary detils w-75 mx-auto mb-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">More details</button>
           </div>
         </div>
       </div>
      
     </div>
         
         `


    phoneResult.appendChild(div)


  })
  // show all button hide or show 

  const allPhonebutton = document.getElementById('see-all')
  if (phoneResult.textContent == "") {

    allPhonebutton.style.display = "none";
    const searchFeildValue = phoneInput.value;
    const daynamic = document.getElementById("daynamic");
    daynamic.innerText = `${searchFeildValue}`
    document.getElementById("notext").style.display = "block";
  } else {
    document.getElementById("notext").style.display = "none";
    allPhonebutton.style.display = "block";
  }




  loading('none');

}
// mordel show 
const modalShow = (id) => {
  loading('block');
  fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(res => res.json())
    .then(data => popmodel(data.data))
}
const popmodel = (phone) => {
  const headerModel = document.getElementById('staticBackdropLabel');
  headerModel.innerText = `${phone.name}`
  const bodyPop = document.getElementById('details');
  bodyPop.innerHTML = '';
  const div = document.createElement('div');
  if (phone.releaseDate === "") {
    phone.releaseDate = "No release date found"
  }
  div.innerHTML = `
  <div class="">
  <div class='d-flex justify-content-center'>
  <img src="${phone.image}" alt="">
  </div>
  <div class="ms-4">
  <h6><span class="title">Brand:</span> ${phone.brand}</h6>
  <h5><span class="header-title">Main Features:-</span></h5>
  <h6><span class="title">ChipSet:</span> ${phone.mainFeatures.chipSet}</h6>
  <h6><span class="title">Display Size:</span> ${phone.mainFeatures.displaySize}</h6>
  <h6><span class="title">Storage:</span> ${phone.mainFeatures.storage}</h6>
  <h6><span class="title">Sensors:</span> ${phone.mainFeatures.sensors}</h6>
  <h5><span class="header-title">Others:-</span></h5>
  <h6><span class="title">Bluetooth:</span> <span class="otherselement">${phone?.others?.Bluetooth}</span></h6>
  <h6><span class="title">GPS:</span> <span class="otherselement">${phone?.others?.GPS}</span></h6>
  <h6><span class="title">Radio:</span> <span class="otherselement">${phone?.others?.Radio}</span></h6>
  <h6><span class="title">ReleaseDate:</span> ${phone.releaseDate}</h6>
  </div>
  </div>
    `
  loading('none');
  bodyPop.appendChild(div);

  const element = document.getElementsByClassName("otherselement");
  for (const title of element) {
    if (phone?.data?.others == undefined) {
      title.innerText = "this feature is not found";
    }
  }

}
/* show all button */


const seeAll = () => {
  const seeallValue = document.getElementById('see-all');
  seeallValue.style.display = "none";
  const searchValue = phoneInput.value;

  fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue.toLowerCase()}`)
    .then(res => res.json())
    .then(data => showAlldata(data.data))
}
const showAlldata = (phones) => {



  const allData = phones.slice(20, phones.length)

  allData.forEach(phone => {
    const div = document.createElement('div')
    div.innerHTML = `
      <div class="card-group ">
         <div class="card g-col-3">
         <img src="${phone.image}" class="card-img-top text-center img-fluid" alt="${phone.phone_name}">
         <div class="card-body">
           <h5 class="card-title text-center">${phone.phone_name}</h5>
           <h6 class="card-title text-center">${phone.brand}</h6>
           <div class='d-grid gap-2 mt-3'>
           <button onclick="modalShow('${phone.slug}')" class="btn btn-primary detils w-75 mx-auto mb-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">More details</button>
           </div>
         </div>
       </div>
      
     </div>
         
         `
    phoneResult.appendChild(div);

  })

}