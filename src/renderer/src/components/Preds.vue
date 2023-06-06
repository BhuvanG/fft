<script setup>
import { ref } from 'vue'
import Fixtures from '../assets/matches.json'
import moment from 'moment'
let dataFixture = ref([]);

//Getting all the fixtures from the json file
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
})

//
function getPrediction(e) {
    //checking if predition attribute is empth or filled using if statements
    //changing backgroud color of the team that is clicked
    //composedPath is used to get parent elemets of the clicked element
    if (e.composedPath()[1].getAttribute("prediction") == "") {
        let team = e.target.id;
        e.composedPath()[1].setAttribute("prediction", team);
        e.target.style.backgroundColor = "#30ea39";
    }
    else if (e.composedPath()[1].getAttribute("prediction") == "HOME_TEAM") {
        if (e.target.id == "AWAY_TEAM") {
            let team = e.target.id;
            e.composedPath()[1].setAttribute("prediction", team);
            e.target.style.backgroundColor = "#30ea39";
            e.composedPath()[1].childNodes[0].style.backgroundColor = "#5c808e";
        }
    }
    else if (e.composedPath()[1].getAttribute("prediction") == "AWAY_TEAM") {
        if (e.target.id == "HOME_TEAM") {
            let team = e.target.id;
            e.composedPath()[1].setAttribute("prediction", team);
            e.target.style.backgroundColor = "#30ea39";
            e.composedPath()[1].childNodes[1].style.backgroundColor = "#5c808e";
        }
    }

    //getting all the nodes with class n and checking if all the nodes have prediction attribute filled
    let nodes = e.composedPath()[2].querySelectorAll('.n');
    let count = 0;

    nodes.forEach((node) => {
        if (node.getAttribute('prediction') != "") {
            count++;
        }
    })
    //if all predictions are filled then changing the background color of the check mark
    if (count == 3) {
        e.composedPath()[2].childNodes[0].style.background = '#30ea39';
    }
}


</script>

<template>
    <div class="grid-container">
        <div class="heading">
            <p>CHECK</p>
            <p>HOME TEAM</p>
            <p>AWAY TEAM</p>
            <p>DATE</p>
            <p style="background-color: #e02d2d;">AZEEM</p>
            <p style="background-color: #302de0;">NEVILLE</p>
            <p style="background-color: #ffffff;">KAUTUK</p>
        </div>
        <div class="pred-container" v-for="fixture in dataFixture" :id=fixture.id>
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
            <div class="n" id="Azeem" prediction="">
                <img :src="fixture.homeCrest" id="HOME_TEAM" @click="getPrediction">
                <img :src="fixture.awayCrest" id="AWAY_TEAM" @click="getPrediction">
            </div>
            <div class="n" id="Neville" prediction="">
                <img :src="fixture.homeCrest" id="HOME_TEAM" @click="getPrediction">
                <img :src="fixture.awayCrest" id="AWAY_TEAM" @click="getPrediction">
            </div>
            <div class="n" id="Kautuk" prediction="">
                <img :src="fixture.homeCrest" id="HOME_TEAM" @click="getPrediction">
                <img :src="fixture.awayCrest" id="AWAY_TEAM" @click="getPrediction">
            </div>
        </div>
    </div>
</template>

<style>
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

#az {
    background-color: #e02d2d;
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