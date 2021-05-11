exports.getMenu = (req, res, next) => {

    const dt = req.params.date;

    //ES6 Sample code
    const notes = [];
    const generateId = () => {
        const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id)) // ...syntax + map method
        : 0

        return maxId + 1;
    }

    const note = {
        important: body.important || false //if the data saved in the body variable has the important property
    }
    
};