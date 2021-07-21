package main

import (
	Modeling "fridaycrud/main/Models"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

  
  func main() {
	//   Server/////////////////
	// refer https://github.com/go-sql-driver/mysql#dsn-data-source-name for details
	dsn := "cps:cps@tcp(localhost:3312)/article?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Println(err)
		return 
	}
	log.Println("Database Connected!!")

	// Modeling패키지에서 만든 struct
	db.AutoMigrate(
		// Modeling.Article{},
		Modeling.Article{},
	)

	log.Println("Successfully Automigration Finished!!")
	//   Server/////////////////




	
	// Service/////////////////
	r := gin.Default()
	r.POST("/create_content/", func(c *gin.Context) {
  	var article Modeling.Article
	// id := c.Param("id")
	// log.Print(c.Param("id"))

	err := c.BindJSON(&article)
		if err != nil {
			log.Println("바인딩이 잘 안됨")
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
		"status": err,
   		})
	}

	// err2 := db.Where("id = ?", id).First(&article).Create(&article).Error
	err2 := db.Create(&article).Error
		if err2 != nil {
			log.Print(err2)
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"status": err2,
			})
	}
		log.Println("Create 완료")

    c.JSON(http.StatusOK, gin.H{"status": "ok", "article" : &article})
	})



	r.DELETE("/delete/:id", func(c *gin.Context) {
		id := c.Param("id")
		var article Modeling.Article
		db.Where("id = ?",id).Delete(&article)
	  })
	

  ///////////////////////////////////////////READ///////////////////////////////////////////////////

  r.PUT("/update/:id/", func(c *gin.Context) {

	var article Modeling.Article
    name := c.Param("name")
	content :=c.Param("content")
    id := c.Param("id")
	// db.Where("id = ?", id).First(&article).Updates(Modeling.Article{ Name: name,Content: content})
	db.Where("id = ?", id).First(&article).Updates(Modeling.Article{ Name: name,Content: content})
	  //  2. article에 어떻게 업데이트 하는지?
    db.Save(&article)
	  //   db.Model(&article).Where("id = ?", id).Updates(Modeling.Article{ Name: id})

  })
    

  
	// r.GET("/get/:id", func(c *gin.Context) {
	r.GET("/get/", func(c *gin.Context) {
		// name := c.Param("getName")
		// log.Print(c.Param(name))

		
 	  var article []Modeling.Article
 	//   var article Modeling.Article
	//   log.Print(article)


	  db.Find(&article)

	  // 리턴이 안되고 gin 규칙을 따라 아래처럼 보내줘야 한다
	  c.JSON(http.StatusOK, gin.H{"status": "ok", "article" : &article})
 	//   return &article 
	   
	//    err := c.BindJSON(&article)





	//   id := c.Param("id")
	//   err := db.Where("id = ?", id).First(&article).Error
    //   err := db.First(&article, "name =?", "crud").Error

    //   if err != nil {
    //     c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
    //       "status": err,
    //     })
    //     return 
    //   }
    //   log.Println(id)
    //   c.JSON(http.StatusOK, gin.H{"status": "ok", "article" : &article})

	  
	// func GetUsers(c *gin.Context) {
	// 	users := []models.Person{}
	// 	db.Find(&users)
	// 	c.JSON(200, &users)
	//    }

	})

  ///////////////////////////////////////////Update///////////////////////////////////////////////////

	r.Run(":8088")
	// return db
  }
