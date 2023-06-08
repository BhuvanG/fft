<script setup>
    import 
</script>

<template>
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
</template>