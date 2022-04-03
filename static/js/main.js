const text1=document.querySelector(".text1") 
const search=document.querySelector(".search") 
const input=document.querySelector(".input") 
const info=document.querySelector(".info") 
const min=document.querySelector(".min") 
const max=document.querySelector(".max") 
const wind_speed=document.querySelector(".wind_speed") 
const time=document.querySelector(".time")
const statusEl=document.querySelector(".weather-status")
const weather_info=document.querySelector(".weather_info")
const audio1=document.getElementById("myAudio1")
const audio2=document.getElementById("myAudio2")
const audio3=document.getElementById("myAudio3")
const audio4=document.getElementById("myAudio4")
const loaders=document.querySelector(".loaders")
const loader=document.querySelector(".loader")
const btn=document.querySelector(".btn")


// audio.pouse()

async function add(cityName){

    loaders.classList.remove("active")

    const api_key = '3381b7db57c359dc59c051deb63a7a58'
    const api_link = 'https://api.openweathermap.org/data/2.5/weather'
    
    try {
        const req= await fetch(`${api_link}?q=${cityName}&units=metric&appid=${api_key}`)
        
        console.log(req);

        if(req.statusText == "Unauthorized"){
            throw new Error("so'rov bilan bog'liq xato")
        }
        else if(!req.ok){
            throw new Error(
                "Shaxar nomini tog'ri kiriting"
            )
        }
        const data = await req.json()
        .then(getData)
    } catch (err){
        console.log("try bn bogliq muammo");
        console.log(err.message)
        loader.textContent=`${err.message}`
        btn.style.display="block"
    }
    
    function getData(data){
        const weather=data;

        loaders.classList.add("active")

        console.log(weather);
        text1.innerHTML=`<span>${weather.name}</span>, <span>${weather.sys.country} <i class="fa-solid fa-location-dot"></i></span>`
        info.textContent=`${weather.main.temp}℃`
        min.textContent=`${weather.main.temp_min}℃`
        max.textContent=`${weather.main.temp_max}℃`
        wind_speed.textContent=`${weather.wind.speed}m/s`
        statusEl.textContent=`${weather.weather[0].main}`

        if(statusEl.textContent=="Mist"){
            weather_info.style.background="url(../gif/5.gif)"
       
            audio1.play()
            audio2.pause()
            audio3.pause()
            audio4.pause()
        }
        if(statusEl.textContent=="Clouds"){
            weather_info.style.background="url(../gif/3.gif)"
          
            audio1.pause()
            audio2.play()
            audio3.pause()
            audio3.pause()
        }
        if(statusEl.textContent=="Clear"){
            weather_info.style.background="url(../gif/3.gif)"
            audio1.pause()
            audio2.play()
            audio3.pause()
            audio3.pause()
        }
        if(statusEl.textContent=="Rain"){
            weather_info.style.background="url(../gif/1.gif)"

            audio1.pause()
            audio2.pause()
            audio3.play()
            audio4.pause()
        }
        if(statusEl.textContent=="Snow"){
            weather_info.style.background="url(../gif/2.gif)"

            audio1.pause()
            audio2.pause()
            audio3.pause()
            audio4.play()
        }

        const today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();

        h = checkTime(h);
        m = checkTime(m);

        time.textContent= h + ":" + m
        if(parseInt(info.textContent) < 0){
            weather_info.style.background="url(../gif/4.gif)"
            statusEl.textContent="very cold"
        }
    }
    
}
search.addEventListener("submit",(e)=>{
    e.preventDefault()
    const cityName=input.value
    add(cityName)
})

function checkTime(i) {
    if (i < 10) {i = "0" + i};  
    return i;
}
btn.addEventListener("click", ()=>{
    loaders.classList.add("active")
    loader.textContent="Loading..."
    input.value=""
    console.clear()
    btn.style.display="none"
})

add("Fergana")
