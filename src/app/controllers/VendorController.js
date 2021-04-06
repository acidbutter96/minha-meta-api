import Vendor from '../models/Vendor';

class VendorController {
    show(req, res) {
        return res.status(200).send(`vendor show ${req.params.id}`)
    }

    index(req, res) {
        return res.status(200).send('vendors index');
    }
    store(req, res) {
        return res.status(200).send('vendor store');
    }

    update(req, res) {
        return res.status(200).send('vendor update');
    }

    destroy(req, res) {
        return res.status(200).send('vendor destroy');
    }


}

export default new VendorController();