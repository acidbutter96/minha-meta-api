import MonthlySale from '../models/MonthlySale';

class MonthlySaleController {
    show(req, res) {
        return res.status(200).send(`monthly sale show ${req.params.id}`)
    }

    index(req, res) {
        return res.status(200).send('monthly sales index');
    }
    store(req, res) {
        return res.status(200).send('monthly sale store');
    }

    update(req, res) {
        return res.status(200).send('monthly sale update');
    }

    destroy(req, res) {
        return res.status(200).send('monthly sale destroy');
    }
}

export default new MonthlySaleController();