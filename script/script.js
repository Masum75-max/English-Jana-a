

const loadLessons = ()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res=>res.json())
    .then(json=>display(json.data))
} 
  const lessonContainer = document.getElementById("level-container")
const display =(lessons)=>{
    for(const lesson of lessons){
        console.log(lesson)
    

    const lessonDiv=document.createElement("div");

    lessonDiv.innerHTML=`
    <button id="btn-${lesson.level_no}" onClick="loadWord(${lesson.level_no})" class="btn btn-outline btn-primary lsn-btn"><i class="fa-solid fa-book-open"></i> Lesson-
     ${lesson.level_no}</button>
    `

    lessonContainer.appendChild(lessonDiv);

    }
}
loadLessons()

function removeActv(){
  const alllsnbtns=document.getElementsByClassName('lsn-btn')

  for(const btn of alllsnbtns){
    btn.classList.remove("active");
  }
}

const loadWord=(id)=>{
    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then(res=>res.json())
    .then(data=>{
      removeActv();

      const addActvTo=document.getElementById(`btn-${id}`)

      addActvTo.classList.add("active")


      displayWord(data.data)
    
    }
  );
}

const displayWord=(words)=>{
const wordContainer = document.getElementById("word-container")

wordContainer.innerHTML="";
if(words.length===0){
  wordContainer.innerHTML=`
   <div class="flex flex-col justify-center items-center col-span-full">
                   <img src="./assets/alert-error.png" class="mx-auto">
                  <h6 class="text-sm mb-2">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h6>
                  <h2 class="font-semibold text-2xl">নেক্সট Lesson এ যান</h2>
               </div>
  
  `
}

    for(const word of words){
   const card = document.createElement("div");

card.innerHTML = `
<div
  class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4"
>
  <h2 class="font-bold text-2xl">${word.word}</h2>
  <p class="font-semibold">Meaning /Pronounciation</p>
  <div class="text-2xl font-medium font-bangla">${word.meaning? word.meaning:"Not Found"}/${word.pronunciation}</div>
  <div class="flex justify-between items-center">
    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
      <i class="fa-solid fa-circle-info"></i>
    </button>
    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
      <i class="fa-solid fa-volume-high"></i>
    </button>
  </div>
</div>
`;

wordContainer.append(card); 
    }
}