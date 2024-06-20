import InputError from '../error/InputError.js';
import predictClassification from '../services/inferenceService.js';
import storeData from '../services/storeData.js';

const postPredictHandler = async (request, h) => {
  try {
    const { model } = request.server.app;
    const { image } = request.payload;

    const { confidenceScore, label, suggestion } =
      await predictClassification(model, image);

    const id = crypto.randomUUID();

    const createdAt = new Date().toISOString();

    const data = {
      id,
      result: label,
      suggestion,
      createdAt,
    };

    await storeData(id, data);

    return h
      .response({
        status: 'success',
        message:
          confidenceScore >= 100 || confidenceScore < 1
            ? 'Model is predicted successfully'
            : 'Model is predicted successfully but under threshold. Please use the correct picture',
        data,
      })
      .code(201);
  } catch (error) {
    throw new InputError('Terjadi kesalahan dalam melakukan prediksi', 400);
  }
};

const NotFoundHandler = (h) =>
  h
    .response({
      status: 'fail',
      message: '404 Not Found',
    })
    .code(404);

export { postPredictHandler, NotFoundHandler };
