import Vendor from '../models/Vendor';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import configAuth from '../../config/auth';

class SessionController {
    async create(req, res) {
        const { email, password } = req.body;

        const vendorExists = await Vendor.findOne({
            email: email,
        });

        if (!vendorExists) {
            return res.json({
                error: true,
                code: 110,
                message: 'Vendedor não encontrado.'
            });
        }

        if (!(await bcrypt.compare(password, vendorExists.password))) {
            return res.json({
                error: true,
                code: 111,
                message: 'Senha inválida'
            });
        }

        return res.json({
            vendor: {
                id: vendorExists._id,
                name: vendorExists.name,
            },
            token: jwt.sign({ id: vendorExists._id },
                configAuth.secret,
                {
                    expiresIn: configAuth.expiresIn
                })
        });
    }
}

export default new SessionController();