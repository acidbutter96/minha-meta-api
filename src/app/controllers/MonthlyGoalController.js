import MonthlyGoal from '../models/MonthlyGoal';

import * as Yup from 'yup';
import bcrypt from 'bcryptjs';

class MonthlyGoalController {
    async show(req, res) {
        await MonthlyGoal.findOne({ _id: req.params.id }).then((data) => {
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

        return res.status(200).send(`vendor show ${req.params.id}`);
    }

    async index(req, res) {
        const { page = 1 } = req.query;
        const { limit = 40 } = req.query;

        await MonthlyGoal.paginate({},
            {
                select: 'title estimated date category vendor_id daily_sales createdAt updatedAt',
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
            title: Yup.string()
                .required(),
            estimated: Yup.number()
                .required(),
            real_value: Yup.number(),
            date: Yup.date()
                .required(),
            category: Yup.string()
                .required(),
            vendor_id: Yup.string()
                .required(),
            daily_sales: Yup.array()
                .required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 101,
                message: 'Erro: Estrutura dos dados informados é inválida, verifique os dados da sua requisição.'
            });
        }

        var data = { ...req.body, real_value: 0 };

        data.daily_sales.map((el) => {
            el.list.map((subel) => {
                data.real_value += subel.amount * subel.quantity;
            });
        });

        const goal = await MonthlyGoal.create(data);

        return res.status(200).json({
            error: false,
            message: 'Meta cadastrado com sucesso',
            goal
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            _id: Yup.string()
                .required(),
            daily_sales: Yup.array()
                .required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 112,
                message: 'Verifique os dados informados'
            });
        }

        var data = { real_value: 0, daily_sales: [] };

        const { _id, daily_sales } = req.body;
        const goal = await MonthlyGoal.findOne({ _id: _id });

        data.daily_sales = goal.daily_sales.concat(daily_sales);

        //return res.json({ 'err': goal.daily_sales.concat(daily_sales) })

        data.daily_sales.map((el) => {
            el.list.map((subel) => {
                data.real_value += subel.amount * subel.quantity;
            });
        });

        await MonthlyGoal.updateOne({ _id: _id }, data, (err) => {
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

    destroy(req, res) {
        return res.status(200).send('monthly goal destroy');
    }
}

export default new MonthlyGoalController();