const getAIRecommendation =
require("../services/aiService");

const recommend = async (req, res) => {

  try {

    const data =
    await getAIRecommendation(req.body);

    res.json(data);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "AI Recommendation Failed"
    });
  }
};

module.exports = {
  recommend
};