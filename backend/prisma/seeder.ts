//seeding category
//https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding
const bcrypt = require("bcrypt");
const prisma_conf = require("../src/config/prisma");



async function main() {

  const create_user =  await prisma_conf.user.create({
    data : {
      email : 'budiwijaya@gmail.com',
      username : "budiwijaya",
      password : await bcrypt.hash("12345", 10),
      name : "Budi Wijaya",
    }
  })

  const daftar_folders = [
    {
      name : "This PC",
      parent_folder_id : null,
      childrens : {
        create : [
          {
            name : "My Document",
          },
          {
            name : "Downloads",
          },
          {
            name : "Local Disk (C:)",
          },
          {
            name : "Local Disk (D:)",
            childrens : {
              create : [
                {
                  name : "Repo Project",
                  user_id : create_user.id,
                },
                {
                  name : "Latihan Coding",
                  user_id : create_user.id,
                  childrens : {
                    create : [
                      {
                        name : "Latihan Laravel",
                        user_id : create_user.id,
                        files : {
                          create : [
                            {
                              name : "Catatan Kecil",
                              content : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                              user_id : create_user.id,
                            }
                          ]
                        }
                      }
                    ]
                  }
                },
              ]
            }
          },
        ]
      }
    },
  ];
  await Promise.all(daftar_folders.map(async (e) => {
    await prisma_conf.folders.create({
      data : e
    })
  }));
}



main()
    .then(async () => {
        await prisma_conf.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma_conf.$disconnect()
        process.exit(1)
    })