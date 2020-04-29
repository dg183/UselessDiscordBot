module.exports = {
    name: 'messagecount',
    aliases: ['msgcount','howmany'],
    description: 'Count the number of messages in this text channel',
    execute(message, args) {

        /** This function works but doesnt work lol
         *  Can count number of messages in the given Collection
         *  Issue: I think the collection is limited to a maximum of 50 messages,
         *          so the count will always cap at 50.
         */

        let count = 0;
        message.channel.messages.fetch()
            .then(messages => {
                console.log(messages);
                messages.each(msg => {
                    count += 1;
                })
                console.log(count);
                message.channel.send(`There have been ${count} messages in this channel`);
            });
    },
};