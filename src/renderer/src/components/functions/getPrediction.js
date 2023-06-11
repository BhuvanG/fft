import { predStore } from '../stores/predStore.js'

let useStore = predStore()
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
        let c = matchDiv.getElementsByClassName('pred-div')
        if (c[0].getAttribute('prediction') != "" && c[1].getAttribute('prediction') != "" && c[2].getAttribute('prediction') != "") {
            useStore.pred[matchid].completed = 'true'
        }
        else {
            useStore.pred[matchid].completed = 'false'
        }

    }, 10);
    //changing color of preds
    //setTimeout is neccesary because the html component pred-container is not rendered yet
    setTimeout(() => {
        setSelectionColor()
    }, 10);

}

export default getPrediction