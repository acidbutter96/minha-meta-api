import Vendor from '../models/Vendor';

import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import { cpf } from 'cpf-cnpj-validator';
import { parse, isDate } from "date-fns";

class VendorController {
    async show(req, res) {
        await Vendor.findOne({ _id: req.params.id }).then((data) => {
            return res.json({
                error: false,
                data: data
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 110,
                message: `Nenhum registro retomado\n${err}`
            });
        });

        return res.status(200).send(`vendor show ${req.params.id}`)
    }

    index(req, res) {
        return res.status(200).send('vendors index');
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string()
                .required(),
            password: Yup.string()
                .required(),
            birthday: Yup.date()
                .required(),
            email: Yup.string()
                .email()
                .required(),
            document: Yup.string()
                .required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 101,
                message: 'Erro: Estrutura dos dados informados é inválida, verifique os dados da sua requisição.'
            });
        }

        var data = req.body;

        const documentExists = await Vendor.findOne({
            document: data.document,
        });

        if (documentExists) {
            return res.status(400).json({
                error: true,
                code: 102,
                message: `Erro: colaborador, ${cpfExists.name} já cadastrado.`
            })
        }

        if (!cpf.isValid(data.document)) {
            return res.status(400).json({
                error: true,
                code: 103,
                message: `Erro: cpf, ${cpf.format(data.document)} é inválido.`
            });
        }

        const emailExists = await Vendor.findOne({
            email: data.email,
        });

        if (emailExists) {
            return res.status(400).json({
                error: true,
                code: 104,
                message: `Erro: e-mail já está sendo utilizado por outro colaborador.`
            });
        }

        data.remuneration = 0;
        data.password = await bcrypt.hash(data.password, 8);

        const vendor = await Vendor.create(data);

        return res.status(200).json({
            error: false,
            message: 'Vendedor cadastrado com sucesso',
            body: vendor
        });
    }

    update(req, res) {
        return res.status(200).send('vendor update');
    }

    destroy(req, res) {
        return res.status(200).send('vendor destroy');
    }


}

export default new VendorController();