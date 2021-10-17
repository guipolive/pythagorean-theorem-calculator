// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ITriangle, ITriangleResponseData } from '../../../model/Triangle';
import nc from 'next-connect';

const applyPythagoreanTheorem = (triangle: ITriangle) => {
    const calculatedHypotenuse = Math.fround(Math.pow(triangle.h, 2));
    const isRectangle = calculatedHypotenuse === Math.fround((Math.pow(triangle.a, 2)) + (Math.pow(triangle.b, 2)));

    return isRectangle;
}

const handler = nc({
    onError: (err, req: NextApiRequest, res: NextApiResponse) => {
        res.status(500).end(err.toString());
    },
    onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
        res.status(405).send("Method Not Allowed");
    },
});

handler.get( async (
    req: NextApiRequest,
    res: NextApiResponse<ITriangleResponseData>
    ) => {
    const {a, b, h} = req.query;
    const myTriangle: ITriangle = {
        a: parseFloat(a as string),
        b: parseFloat(b as string),
        h: parseFloat(h as string),
    }
    
    const isRectangle = applyPythagoreanTheorem(myTriangle);
    let message = '';

    switch (isRectangle) {
        case true:
            message = 'É um triângulo retângulo!';
            break;
        case false:
            message = 'Não é um triângulo retângulo...';
            break;
        default:
            message = 'Erro ao calcular as faces do triângulo...';
    }
    res.status(200).json({ message, isRectangle});
})

export default handler;
