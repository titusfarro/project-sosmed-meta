const { Like, Post } = require("../lib/sequelize"); 
const { Op } = require("sequelize"); 

const likesController = {
  addLikes: async (req, res) => {
    console.log("asdsa")

    console.log(req.body)
    try {
      const { Id_User, Id_Post} = req.body;
      const check = await Like.findOne({
        where: {
          [Op.and]: {
            Id_User,
            Id_Post,
          },
        },
      });

      const checkPost = await Post.findOne({
        where: {
           id: Id_Post,
           id: Id_User
        },
      });

      console.log(check);

      if (check) {
        await Like.destroy({
          where: {
            id: check.dataValues.id,
          },
        });

        await Post.update(
          {
            number_of_likes: checkPost.dataValues.number_of_likes - 1,
          },
          { where: { id: Id_Post } }
        );

        return res.status(200).json({
          message: "unlike post",
        });
      }

      await Like.create({
        Id_User, 
        Id_Post, 
        // ...req.body
      });
      await Post.update(
        {
          number_of_likes: checkPost.dataValues.number_of_likes + 1,
        },
        { where: { id: Id_Post } }
      );

      return res.status(200).json({
        message: "like post",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err.toString(),
      });
    }
  },
};

module.exports = likesController;