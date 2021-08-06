export default function(event='', action) {
    if(action.type == 'readEvent') {
        console.log( "event from store", action.diplayEvent)
        //console.log('bonjour les gens from store')
        return action.diplayEvent;
    } else {
        return event;
    }
}