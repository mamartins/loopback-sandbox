module.exports = function (DaySlots) {
    DaySlots.createSlot = function updateSlot(cb) {
        var today = new Date();

        return DaySlots.create({
            date: today,
        })
            .then(function (returnedDaySlots) {
                returnedDaySlots.slots.create({
                    start: today
                });

                return cb(null, returnedDaySlots);
            })
            .catch(cb)
        ;
    };

    DaySlots.createAndUpdateSlot = function updateSlot(cb) {
        var today = new Date();

        return DaySlots.create({
            date: today,
        })
            .then(function (returnedDaySlots) {
                returnedDaySlots.slots.create({
                    start: today
                });

                returnedDaySlots.slots.set(1, {
                    end: today
                });

                console.log(returnedDaySlots);

                return cb(null, returnedDaySlots);
            })
            .catch(cb)
        ;
    };

    DaySlots.updateSlot = function updateSlot(cb) {
        var today = new Date("12/12/2010");

        return DaySlots.findOne({})
            .then(function (returnedDaySlots) {
                returnedDaySlots.slots.set(1, {
                    end: today
                });

                return cb(null, returnedDaySlots);
            })
            .catch(cb)
        ;
    };

    DaySlots.remoteMethod(
        'createSlot',
        {
            returns: { arg: 'daySlots', type: 'object', root: true },
            http: { path: '/createSlot', verb: 'get' }
        }
    );

    DaySlots.remoteMethod(
        'createAndUpdateSlot',
        {
            returns: { arg: 'daySlots', type: 'object', root: true },
            http: { path: '/createSlot', verb: 'get' }
        }
    );

    DaySlots.remoteMethod(
        'updateSlot',
        {
            returns: { arg: 'daySlots', type: 'object', root: true },
            http: { path: '/updateSlot', verb: 'get' }
        }
    );
};
