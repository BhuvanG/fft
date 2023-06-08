<script setup>
import { ref } from 'vue'
import Fixtures from '../assets/matches.json'
import moment from 'moment'
import { predStore } from './stores/predStore.js'

let useStore = predStore()

//initializing to premeir league
let dataFixture = ref([]);
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
    useStore.setNew(match.id)

})


//league selection
function selectLeague(e) {
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
    //changing color of preds
    //setTimeout is neccesary because the html component pred-container is not rendered yet
    setTimeout(() => {
        setSelectionColor()
    }, 10);

}


//Getting all the fixtures from the json file


// function for getting the prediction and changing the prediction attribute  of the div
function getPrediction(e) {
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
    setTimeout(() => {
        let matchDiv = document.getElementById(matchid)
        let c = matchDiv.getElementsByClassName('n')
        if (c[0].getAttribute('prediction') != "" && c[1].getAttribute('prediction') != "" && c[2].getAttribute('prediction') != "") {
            matchDiv.setAttribute('completed', true)
        }
        else {
            matchDiv.setAttribute('completed', false)
        }

    }, 10);
    //changing color of preds
    //setTimeout is neccesary because the html component pred-container is not rendered yet
    setTimeout(() => {
        setSelectionColor()
    }, 10);

}

//setting the color of the preds
function setSelectionColor() {
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
        if (matchDiv.getAttribute('completed') === "true") {
            matchDiv.children[0].style.backgroundColor = "#60e538"
        }
        else {
            matchDiv.children[0].style.backgroundColor = "#5c808e"
        }
    })

}

</script>

<template>
    <div class="grid-container">
        <div class="custom-select" style="width:200px;">
            <select id="currentLeague" @change="selectLeague">
                <option value="Premier League">Premier League</option>
                <option value="Primera Division">La Liga</option>
                <option value="Bundesliga">Bundesliga</option>
                <option value="Serie A">Serie A</option>
                <option value="Ligue 1">Ligue 1</option>
                <option value="Champions League">Champions League</option>
            </select>
        </div>
        <div class="heading">
            <p>CHECK</p>
            <p>HOME TEAM</p>
            <p>AWAY TEAM</p>
            <p>DATE</p>
            <p style="background-color: #e02d2d;">AZEEM</p>
            <p style="background-color: #302de0;">NEVILLE</p>
            <p style="background-color: #ffffff;">KAUTUK</p>
        </div>
        <div class="pred-container" v-for="fixture in dataFixture" :id="fixture.id" completed=false>
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
            <div class="n" id="Azeem" :prediction="useStore.pred[fixture.id].Azeem">
                <img :src="fixture.homeCrest" id="HOME_TEAM" @click="getPrediction">
                <img :src="fixture.awayCrest" id="AWAY_TEAM" @click="getPrediction">
                <div id="DRAW" @click="getPrediction">
                    D
                </div>
            </div>
            <div class="n" id="Neville" :prediction="useStore.pred[fixture.id].Neville">
                <img :src="fixture.homeCrest" id="HOME_TEAM" @click="getPrediction">
                <img :src="fixture.awayCrest" id="AWAY_TEAM" @click="getPrediction">
                <div id="DRAW" @click="getPrediction">
                    D
                </div>
            </div>
            <div class="n" id="Kautuk" :prediction="useStore.pred[fixture.id].Kautuk">
                <img :src="fixture.homeCrest" id="HOME_TEAM" @click="getPrediction">
                <img :src="fixture.awayCrest" id="AWAY_TEAM" @click="getPrediction">
                <div id="DRAW" @click="getPrediction">
                    D
                </div>
            </div>

        </div>

    </div>
</template>

<style>
.custom-select {
    margin: auto;
}

select {
    border: none;
    background-color: #1667b3;
    height: 50px;
    width: 200px;
    font-size: 20px
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



.heading>p {
    padding-top: 5px;
    text-align: center;
    height: 100%;
    width: 100%;
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

.n {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    gap: 10px;

}

.n>img {
    width: 30px;
    height: 30px;
    background-color: #5c808e;
    border: 2px solid black;
    border-radius: 2px;
    padding: 5px;
}

.n>div {
    text-align: center;
    font-size: 25px;
    width: 30px;
    height: 30px;
    background-color: #5c808e;
    border: 2px solid black;
    border-radius: 2px;
    padding: 5px;
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