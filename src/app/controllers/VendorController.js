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

    async index(req, res) {
        const { page = 1 } = req.query;
        const { limit = 40 } = req.query;

        await Vendor.paginate({},
            {
                select: 'name email birthday document remuneration createdAt updatedAt',
                page,
                limit
            }).then((data) => {
                return res.json({
                    error: false,
                    data
                });
            }).catch((err) => {
                return res.status(400).json({
                    error: true,
                    code: 111,
                    message: `Não foi possível processar a solicitação.\nError: ${err}`
                });
            });
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

    async update(req, res) {
        const schema = Yup.object().shape({
            _id: Yup.string()
                .required(),
            name: Yup.string()
                .required(),
            oldpassword: Yup.string()
                .required(),
            password: Yup.string(),
            email: Yup.string()
                .email()
                .required(),
            remuneration: Yup.number()
                .required(),
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 112,
                message: 'Verifique os dados informados'
            });
        }

        const { _id, name, email, remuneration } = req.body;

        const vendorExists = await Vendor.findOne({
            _id: _id
        });

        if (!vendorExists) {
            return res.status(400).json({
                error: true,
                code: 113,
                message: 'Vendedor não encontrado'
            });
        }

        var data = {};

        if (name) data.name = name;
        if (remuneration) data.remuneration = remuneration;
        if (password) data.password = await bcrypt.hash(password, 8);

        if (email) {
            if ((await Vendor.findOne({
                email: email
            }))) {
                return res.status(400).json({
                    error: true,
                    code: 114,
                    message: 'O e-mail escolhido já está sendo utilizado'
                });
            }
            data.email = email;
        }

        const passCheck = await Vendor.findOne({ _id: _id });
        if (!(await bcrypt.compare(oldpassword, passCheck.password))) {
            return res.status(403).json({
                error: true,
                code: 115,
                message: 'Senha antiga incorreta'
            });
        } else {
            await Vendor.updateOne({ _id: _id }, data, (err) => {
                if (err) {
                    return res.status(400).json({
                        error: true,
                        code: 117,
                        message: `Operação falhou, tente novamente\nErr: ${err}`
                    });
                } else {
                    return res.json({
                        error: false,
                        message: 'Perfil editado com sucesso'
                    });
                }
            });
        }

    }

    destroy(req, res) {
        return res.status(200).send('vendor destroy');
    }


}

export default new VendorController();