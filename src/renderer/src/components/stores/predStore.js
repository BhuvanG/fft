import { defineStore } from "pinia";

export const predStore = defineStore({
    id: 'pred',
    state: () => ({
        pred: {}
    }),
    actions: {
        setPred(mathchId, user , selection) {
            this.pred[mathchId] = {}
            this.pred[mathchId][user] = selection
        },
        setNew(matchId){
            
            this.pred[matchId] = {}
            this.pred[matchId]['Azeem'] = ""
            this.pred[matchId]['Neville'] = ""
            this.pred[matchId]['Kautuk'] = ""
            
            
        }
    }
  })

