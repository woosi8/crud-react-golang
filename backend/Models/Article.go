package Modeling

import "gorm.io/gorm"

// type Article struct {
// 	gorm.Model
// 	ID      uint
// 	Name string `json:"name"`
//     Username     int64  `json:"username"`
// }


type Article struct {
	gorm.Model
	ID      uint
	Content string `json:"content"`
    Age      int64  `json:"age"`
    Name     string `json:"name"`
}