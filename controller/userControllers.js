const User = require("../models/User");

const genreateToken = require('../Until/generateToken')
//Login
const Login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });


  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genreateToken(user._id)
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
};
    
  //REGISTER
const register=  async (req, res) => {
  const { name,email,password} = req.body;
   const Newuser = new User({
    name,
    email,
    password
   })
  const saveUser = await Newuser.save();
  res.json(saveUser);
};

   const getUser = async( req, res) =>{
       const user = await User.find({});
        res.json(user);
   }

  const update = async(req, res) =>{
       const user = await User.findById(req.params.id);
       if(user){
        user.name = req.body.name|| user.name;
        user.email = req.body.email|| user.email
         if(req.body.password){
          user.password= req.body.password;
         }
        }
        const saveUser= await user.save();
       res.json({
        name: saveUser.name,
        email: saveUser.email,
        password : saveUser.password,
        isAdmin: saveUser.isAdmin,
        token: genreateToken(saveUser._id)
       })
      
  }
const profile = async( req, res) =>{
  const user = await User.findById(req.params.id);
   if(user){
     res.json({
      name: user.name,
      email:user.email,
      isAdmin: user.isAdmin
     })
   }
}
//$project : chỉ định các field mong muốn truy vấn.
//$match : chọn document mong muốn truy vấn.

//Aggregation framework là một truy vấn nâng cao của MongoDb, 
/*cho phép thực hiện tính toán , 
xử lý và kết hợp từ nhiều document(tương tự các bảng trong SQL) 
để cho ra thông tin cần thiết. Ví dụ : Chúng ta có các
document : sales, product và user , chúng ta có thể dùng Aggregation framework 
để tính toán thông tin từ 3 bảng này như danh số bán trong tháng này,
danh số theo sản phẩm hoặc theo user. Có thể hình dung Aggregation tương
tự như lệnh GROUP BY trong SQL.*/

// lay user theo thống kê
  const getUserByStats = async(req, res) =>{
      const date = new Date();
      const lastYear = new Date(date.setFullYear(date.getFullYear()-1));
       try {
         const data = await User.aggregate([
          {$match :{createdAt:{$gte:lastYear}}},
          {
            $project: {
            month :{$month:" $createdAt"}
            },
          },
          {
            $group:{
              _id: "$month",
              total:{$sum :1}
            }
          }
         ])
         res.json(data);
       } catch (error) {
        throw new Error("Fail")
       }
  }

module.exports = { register,getUser,update,Login,profile,getUserByStats};
