
User.destroy_all

u1 = User.create name:"admin", email:"admin@gmail.com", password:"chicken", avatar:"https://fillmurray.com/100/100"
 # is_admin:true

u2 = User.create name:"michelle", email:"michelle@gmail.com", password:"chicken", avatar:"https://fillmurray.com/100/100"

u3 = User.create name:"Edgeyyyyy", email:"edge@gmail.com", password:"chicken", avatar:"https://fillmurray.com/100/100"

u4 = User.create name:"chicken", email:"chicken@gmail.com", password:"chicken", avatar:"https://fillmurray.com/100/100"

Chatroom.destroy_all

p1 = Chatroom.create name:"WDI22"


Message.destroy_all

c1 = Message.create content:"Hey,let's draw something!"
c2 = Message.create content:"Please draw me the address to ur house"
c3 = Message.create content:"Why"
c4 = Message.create content:"coz I don't wanna someone to bring sausage to my house"
c5 = Message.create content:"Sup,girrrrls?"

# binding.pry

u1.messages << c2
u2.messages << c1 << c4
u3.messages << c5
u4.messages << c3



p1.messages << c1 << c2 << c3 << c4 << c5
