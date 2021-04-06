import MonthlyGoal from '../models/MonthlyGoal';

class MonthlyGoalController {
    show(req, res) {
        return res.status(200).send(`monthly goal show ${req.params.id}`)
    }

    index(req, res) {
        return res.status(200).send('monthly goals index');
    }
    store(req, res) {
        return res.status(200).send('monthly goal store');
    }

    update(req, res) {
        return res.status(200).send('monthly goal update');
    }

    destroy(req, res) {
        return res.status(200).send('monthly goal destroy');
    }
}

export default new MonthlyGoalController();