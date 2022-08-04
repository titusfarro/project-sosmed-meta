const { Comment, User } = require("../lib/sequelize");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { generateToken } = require("../lib/jwt");
const CommentController = {
  fetchComment: async (req, res) => {
    try {
      const { Id_Post } = req.query;

      console.log(Id_Post);
      const comments = await Comment.findAll({
        include: User,
        where: {
          Id_Post,
        },
      });
      console.log(comments);

      res.status(200).json({
        message: "fetching comments",
        result: comments,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err.toString(),
      });
    }
  },
  postComment: async (req, res) => {
    try {
      const { Id_User, content, Id_Post } = req.body;

      console.log(req.body);

      await Comment.create({
        Id_User,
        content,
        Id_Post,
      });

      return res.status(200).json({
        message: "new comment added",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err.toString(),
      });
    }
  }, 

  editComment: async (req, res) => {
    try {
        const {id} = req.params; 

        await Comment.update(
            {
                ...req.body, 
            }, 
            {
                where:{
                    id,
                },
            }
        ); 

        return res.status(200).json({
            message: "Comment success edited",
        });
    } catch (err) {
        console.log(err); 
        res.status(500).json({
            message: err.toString()
        });
    }
  },

  deleteComment: async(req,res) => {
    try {
        const { id } = req.params; 

        await Comment.destroy({
            where: { id },
        }); 
    } catch(err) {
        console.log(err); 
        res.status(500).json({
            message: err.toString(),
        });
    }
  },
};

module.exports = CommentController;
