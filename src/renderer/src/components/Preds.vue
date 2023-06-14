<script setup>
import { ref } from 'vue'
import moment from 'moment'
import { predStore } from './stores/predStore.js'
import axios from 'axios'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import Swal from 'sweetalert2'
// import db from './database/db.js'
import db from './database/db';


let useStore = predStore()
let date = ref()
//initializing to premeir league
let dataFixture = ref([]);
let Fixtures;
let render = ref(false)

//getting the fixtures from the api when date is selected
async function handleDate() {
    await reset()
    date.value = moment(date.value).format('YYYY-MM-DD')
    let currentDate = '2023-05-25'
    currentDate = moment(currentDate).format('YYYY-MM-DD')
    const config = {
        headers: {
            'X-Auth-Token': '49185e58260b4576ab876d47977111cc'
        }
    }

    axios.get(`https://api.football-data.org/v4/matches/?dateFrom=2023-05-08&dateTo=2023-05-14`, config)
        .then((response) => {
            Fixtures = response.data
            Fixtures.matches.forEach((match) => {
                if (match.competition.name === 'Premier League') {
                    dataFixture.value.push({
                        homeTeam: match.homeTeam.name,
                        awayTeam: match.awayTeam.name,
                        homeCrest: match.homeTeam.crest,
                        awayCrest: match.awayTeam.crest,
                        id: match.id,
                        date: match.utcDate
                    })
                }
                useStore.setNew(match.id, match.homeTeam.name, match.awayTeam.name, match.homeTeam.crest, match.awayTeam.crest, match.utcDate)
            })
            render.value = true
        })
        .catch((error) => {
            console.log(error)
        })


}

async function reset() {
    useStore.$reset()
    render.value = false
    dataFixture.value = []
}


//league selection
async function selectLeague(e) {
    let arr = [];
    //getting all the fixtures of the selected league
    Fixtures.matches.forEach((match) => {
        if (match.competition.name === e.target.value) {
            arr.push({
                homeTeam: match.homeTeam.name,
                awayTeam: match.awayTeam.name,
                homeCrest: match.homeTeam.crest,
                awayCrest: match.awayTeam.crest,
                id: match.id,
                date: match.utcDate
            })
        }
    })
    //setting value to dataFixture
    dataFixture.value = arr;
}




// function for getting the prediction and changing the prediction attribute  of the div
async function getPrediction(e) {
    //getting the match id
    let matchid = e.target.parentElement.parentElement.id
    //getting the user
    let user = e.target.parentElement.id
    let pred = useStore.pred[matchid]
    if (pred[user] === "") {
        pred[user] = e.target.id
    }
    else if (pred[user] === e.target.id) {
        pred[user] = ""
    }
    else {
        pred[user] = e.target.id
    }

    //setting the prediction attribute of the pred-continer div
    //setTimeout is neccesary because the html component pred-container attribute is not rendered yet


}

async function checkCompleted(e) {
    let matchid = e.target.parentElement.parentElement.id
    let matchDiv = document.getElementById(matchid)
    let c = matchDiv.getElementsByClassName('pred-div')
    if (c[0].getAttribute('prediction') != "" && c[1].getAttribute('prediction') != "" && c[2].getAttribute('prediction') != "") {
        useStore.pred[matchid].Completed = 'true'
    }
    else {
        if (useStore.captain.Azeem == matchid) {
            useStore.captain.Azeem = ""
        }
        if (useStore.captain.Neville == matchid) {
            useStore.captain.Neville = ""
        }
        if (useStore.captain.Kautuk == matchid) {
            useStore.captain.Kautuk = ""
        }
        useStore.pred[matchid].Completed = 'false'
    }
}


//setting the color of the preds
async function setSelectionColor() {
    dataFixture.value.forEach((curr) => {
        let key = curr.id
        let matchDiv = document.getElementById(key)
        if (useStore.pred[key].Azeem === "HOME_TEAM") {
            matchDiv.children[4].children[0].style.backgroundColor = "#60e538"
            matchDiv.children[4].children[1].style.backgroundColor = "#5c808e"
            matchDiv.children[4].children[2].style.backgroundColor = "#5c808e"
        }
        else if (useStore.pred[key].Azeem === "AWAY_TEAM") {
            matchDiv.children[4].children[1].style.backgroundColor = "#60e538"
            matchDiv.children[4].children[0].style.backgroundColor = "#5c808e"
            matchDiv.children[4].children[2].style.backgroundColor = "#5c808e"
        }
        else if (useStore.pred[key].Azeem === "DRAW") {
            matchDiv.children[4].children[2].style.backgroundColor = "#60e538"
            matchDiv.children[4].children[0].style.backgroundColor = "#5c808e"
            matchDiv.children[4].children[1].style.backgroundColor = "#5c808e"
        }
        else {
            matchDiv.children[4].children[0].style.backgroundColor = "#5c808e"
            matchDiv.children[4].children[1].style.backgroundColor = "#5c808e"
            matchDiv.children[4].children[2].style.backgroundColor = "#5c808e"
        }
        if (useStore.pred[key].Neville === "HOME_TEAM") {
            matchDiv.children[5].children[0].style.backgroundColor = "#60e538"
            matchDiv.children[5].children[1].style.backgroundColor = "#5c808e"
            matchDiv.children[5].children[2].style.backgroundColor = "#5c808e"
        }
        else if (useStore.pred[key].Neville === "AWAY_TEAM") {
            matchDiv.children[5].children[1].style.backgroundColor = "#60e538"
            matchDiv.children[5].children[0].style.backgroundColor = "#5c808e"
            matchDiv.children[5].children[2].style.backgroundColor = "#5c808e"
        }
        else if (useStore.pred[key].Neville === "DRAW") {
            matchDiv.children[5].children[2].style.backgroundColor = "#60e538"
            matchDiv.children[5].children[1].style.backgroundColor = "#5c808e"
            matchDiv.children[5].children[0].style.backgroundColor = "#5c808e"
        }
        else {
            matchDiv.children[5].children[0].style.backgroundColor = "#5c808e"
            matchDiv.children[5].children[1].style.backgroundColor = "#5c808e"
            matchDiv.children[5].children[2].style.backgroundColor = "#5c808e"
        }
        if (useStore.pred[key].Kautuk === "HOME_TEAM") {
            matchDiv.children[6].children[0].style.backgroundColor = "#60e538"
            matchDiv.children[6].children[1].style.backgroundColor = "#5c808e"
            matchDiv.children[6].children[2].style.backgroundColor = "#5c808e"
        }
        else if (useStore.pred[key].Kautuk === "AWAY_TEAM") {
            matchDiv.children[6].children[1].style.backgroundColor = "#60e538"
            matchDiv.children[6].children[0].style.backgroundColor = "#5c808e"
            matchDiv.children[6].children[2].style.backgroundColor = "#5c808e"
        }
        else if (useStore.pred[key].Kautuk === "DRAW") {
            matchDiv.children[6].children[2].style.backgroundColor = "#60e538"
            matchDiv.children[6].children[0].style.backgroundColor = "#5c808e"
            matchDiv.children[6].children[1].style.backgroundColor = "#5c808e"
        }
        else {
            matchDiv.children[6].children[0].style.backgroundColor = "#5c808e"
            matchDiv.children[6].children[1].style.backgroundColor = "#5c808e"
            matchDiv.children[6].children[2].style.backgroundColor = "#5c808e"
        }
        //setting color of checkmark circle
        if (useStore.pred[key].Completed == 'true') {
            matchDiv.children[0].style.backgroundColor = "#60e538"
        }
        else {
            matchDiv.children[0].style.backgroundColor = "#5c808e"
        }


        //setting color of captain
        if (useStore.captain.Azeem == key) {
            matchDiv.children[4].style.backgroundImage = "linear-gradient(red, yellow)"
            matchDiv.children[4].children[3].style.color = "gold"
        }
        else {
            matchDiv.children[4].style.backgroundImage = "none"
            matchDiv.children[4].children[3].style.color = "white"
        }
        if (useStore.captain.Neville == key) {
            matchDiv.children[5].style.backgroundImage = "linear-gradient(blue, yellow)"
            matchDiv.children[5].children[3].style.color = "gold"
        }
        else {
            matchDiv.children[5].style.backgroundImage = "none"
            matchDiv.children[5].children[3].style.color = "white"
        }
        if (useStore.captain.Kautuk == key) {
            matchDiv.children[6].style.backgroundImage = "linear-gradient(white, yellow)"
            matchDiv.children[6].children[3].style.color = "gold"
        }
        else {
            matchDiv.children[6].style.backgroundImage = "none"
            matchDiv.children[6].children[3].style.color = "white"
        }
    })


}
async function getCaptain(e) {
    let matchid = e.target.parentElement.parentElement.id
    //getting the user
    let user = e.target.parentElement.id
    if (useStore.pred[matchid].Completed == 'true') {
        if (useStore.captain[user] === matchid) {
            useStore.captain[user] = ""
        }
        else {
            useStore.captain[user] = matchid
        }
    }
}

async function dbUpdatePreds() {
    try {

        //insterting pred container
        const temp = await db.run("insert into predContainer (dateStart,dateEnd) values ('2023-05-08','2023-05-14')")
        const predContainerId = temp.lastID //getting the id of the inserted row

        // inserting the fixtures
        for (let match in useStore.pred) {
            if (useStore.pred[match].Completed == 'true') {
                await db.run(`insert into prediction values (${match},${predContainerId},'${useStore.pred[match].HomeTeam}','${useStore.pred[match].HomeCrest}','${useStore.pred[match].AwayTeam}','${useStore.pred[match].AwayCrest}','${useStore.pred[match].Date}', 'not completed', '', '${useStore.pred[match].Azeem}','${useStore.pred[match].Neville}','${useStore.pred[match].Kautuk}')`)
            }
        }
    }
    catch (err) {
        console.error(err);
    }
}
function submitPreds() {
    Swal.fire({
        title: 'Do you want to save the changes?',
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Cancel`,
    }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            await dbUpdatePreds()
            Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
        }
    })
}

async function setLeague(e) {
    await selectLeague(e)
    await setSelectionColor()
}

async function setCaptain(e) {
    await getCaptain(e)
    await setSelectionColor()
}

async function setPrediction(e) {
    await getPrediction(e)
    await checkCompleted(e)
    await setSelectionColor()
}
</script>

<template>
    <div class="grid-container">
        <div class="filter">

            <p style="margin: 0 10px 0 0; color: white">Filter by date:</p>
            <!-- <input type="date" v-model="date" max="08-06-2023"> -->
            <VueDatePicker v-model="date" style="width:200px" :enable-time-picker="false" :minDate="new Date()"
                @update:model-value="handleDate" />
            <div class="custom-select" style="width:200px;">
                <select id="currentLeague" @change="setLeague">
                    <option value="Premier League">Premier League</option>
                    <option value="Primera Division">La Liga</option>
                    <option value="Bundesliga">Bundesliga</option>
                    <option value="Serie A">Serie A</option>
                    <option value="Ligue 1">Ligue 1</option>
                    <option value="UEFA Champions League">Champions League</option>
                </select>
            </div>
            <input type="button" value="Reset" @click="reset">

            <input type="button" value="Submit" @click="submitPreds">

        </div>
        <div class="heading">
            <div>
                <p>CHECK</p>
            </div>
            <div>
                <p>HOME TEAM</p>
            </div>
            <div>
                <p>AWAY TEAM</p>
            </div>
            <div>
                <p>DATE</p>
            </div>
            <div style="background-color: #e02d2d;">
                <p>AZEEM</p>
            </div>
            <div style="background-color: #302de0;">
                <p>NEVILLE</p>
            </div>
            <div style="background-color: #ffffff;border-radius: 0 5px 0 0;">
                <p>KAUTUK</p>
            </div>
        </div>
        <div class="pred-container" v-if="render" v-for="fixture in dataFixture" :id="fixture.id">
            <div class="circle">
                <div class="checkmark"></div>
            </div>
            <div class="team" id="homeTeam">
                <img :src="fixture.homeCrest" alt="homeCrest">
                <p>{{ fixture.homeTeam }}</p>
            </div>
            <div class="team" id="awayTeam">
                <img :src="fixture.awayCrest" alt="awayCrest">
                <p>{{ fixture.awayTeam }}</p>
            </div>
            <div class="match-date">
                <p>{{ moment(fixture.date).utc().format('DD-MM-YYYY') }}</p>
                <p>{{ moment(fixture.date).format('dddd') }}</p>
            </div>
            <div class="pred-div" id="Azeem" :prediction="useStore.pred[fixture.id].Azeem">
                <img :src="fixture.homeCrest" id="HOME_TEAM" @click="setPrediction">
                <img :src="fixture.awayCrest" id="AWAY_TEAM" @click="setPrediction">
                <div class="draw-div" id="DRAW" @click="setPrediction">
                    D
                </div>
                <div class="draw-captain" id="CAPTAIN" @click="setCaptain">
                    C
                </div>
            </div>
            <div class="pred-div" id="Neville" :prediction="useStore.pred[fixture.id].Neville">
                <img :src="fixture.homeCrest" id="HOME_TEAM" @click="setPrediction">
                <img :src="fixture.awayCrest" id="AWAY_TEAM" @click="setPrediction">
                <div class="draw-div" id="DRAW" @click="setPrediction">
                    D
                </div>
                <div class="draw-captain" id="CAPTAIN" @click="setCaptain">
                    C
                </div>
            </div>
            <div class="pred-div" id="Kautuk" :prediction="useStore.pred[fixture.id].Kautuk">
                <img :src="fixture.homeCrest" id="HOME_TEAM" @click="setPrediction">
                <img :src="fixture.awayCrest" id="AWAY_TEAM" @click="setPrediction">
                <div class="draw-div" id="DRAW" @click="setPrediction">
                    D
                </div>
                <div class="draw-captain" id="CAPTAIN" @click="setCaptain">
                    C
                </div>
            </div>

        </div>


    </div>
</template>

<style>
select {
    outline: 2px solid #010f1c;
    border-radius: 3px;
    background-color: #1667b3;
    height: 50px;
    width: 200px;
    font-family: 'Roboto', sans-serif;
    font-size: 20px
}

.filter {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    gap: 30px;
    margin: 10px 0 10px 0;
    font-size: 20px;
}

.filter>input {
    border: none;
    text-align: center;
    background-color: #6bdde1;
    height: 50px;
    width: 200px;
    font-size: 20px;
    font-family: 'Roboto', sans-serif;
    border-radius: 2px;
}

.grid-container {
    display: grid;
    width: 100%;
    margin: 0 auto;

}

.heading {
    display: grid;
    grid-template-columns: 1fr 2fr 2fr 2fr 2fr 2fr 2fr;
    width: 90%;
    height: 30px;
    margin: auto;
    border: 1px solid #4a7478;
    border-radius: 5px 5px 0 0;
    background-color: rgb(108, 169, 169);
    font-weight: 600;
}



.heading>div {
    display: grid;
    padding-top: 1px;
    text-align: center;
    height: 30px;
    width: 100%;
    margin: auto;
}

.heading>div>p {
    margin: auto;

}

.pred-container {
    display: grid;
    grid-template-columns: 1fr 2fr 2fr 2fr 2fr 2fr 2fr;
    width: 90%;
    height: 80px;
    outline: 1px solid #4a7478;
    background-color: #141617;
    margin: auto;
    color: #D3CFC9;
}

.team {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
    text-align: center;
}

.match-date {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin: auto;
}

img {
    max-width: 40px;
    max-height: 40px;
}

p {
    margin: 0;
}

.circle {
    position: relative;
    background: #5e6652;
    border-radius: 50%;
    width: 20px;
    height: 20px;

    margin: auto;
}

.checkmark {
    position: absolute;
    transform: rotate(45deg) translate(-50%, -50%);
    left: 35%;
    top: 45%;
    height: 6px;
    width: 3px;
    border-bottom: 2px solid white;
    border-right: 2px solid white;
}

.pred-div {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
    margin: auto;
    gap: 4px;
}



.pred-div>img {
    width: 30px;
    height: 30px;
    background-color: #5c808e;
    border: 2px solid black;
    border-radius: 2px;
    margin: auto;
    padding: 5px;
}

.pred-div>img:hover {
    cursor: pointer;
}

.draw-captain {
    display: grid;
    place-self: center;
    grid-column: 2/2;
    text-align: center;
    font-size: 10px;
    width: 8px;
    height: 8px;
    background-color: #020202;
    border: 2px solid black;
    border-radius: 2px;
    padding: 2px;
    margin: auto;
}

.draw-captain:hover {
    cursor: pointer;
}


.draw-div {
    text-align: center;
    font-size: 27px;
    width: 30px;
    height: 30px;
    background-color: #5c808e;
    border: 2px solid black;
    border-radius: 2px;
    padding: 5px;
    margin: auto;
}

.draw-div:hover {
    cursor: pointer;
}

#Azeem {
    background-color: #e02d2d;
    width: 100%;
    height: 100%;
}

#Neville {
    background-color: #302de0;
    width: 100%;
    height: 100%;
}

#Kautuk {
    background-color: #ffffff;
    width: 100%;
    height: 100%;

}
</style>
```