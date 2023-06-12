import { defineStore } from "pinia";

export const predStore = defineStore({
    id: 'pred',
    state: () => ({
        pred: {},
        captain: {Azeem: "", Neville: "", Kautuk: ""}
       
    }),
    actions: {
        setPred(mathchId, user , selection) {
            this.pred[mathchId] = {}
            this.pred[mathchId][user] = selection
        },
        setNew(matchId, homeTeam, awayTeam, homeCrest, awayCrest, date){
            this.pred[matchId] = {}
            this.pred[matchId]['Azeem'] = ""
            this.pred[matchId]['Neville'] = ""
            this.pred[matchId]['Kautuk'] = ""
            this.pred[matchId]['Completed'] = 'false'
            this.pred[matchId]['HomeTeam'] = homeTeam
            this.pred[matchId]['AwayTeam'] = awayTeam
            this.pred[matchId]['HomeCrest'] = homeCrest
            this.pred[matchId]['AwayCrest'] = awayCrest
            this.pred[matchId]['Date'] = date
        }
    }
  })

