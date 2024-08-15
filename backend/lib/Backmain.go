package work

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/mattn/go-sqlite3"
	// "os"
	// "sync"
	// "time"
)

var path [][]int
var supposedFilled int
var currentPos []int
var back bool

func BackMain(inpute RegisterInfo, maxConcurrency int) int {
	fmt.Println("Something")
	return 0
}

func Register(inpute RegisterInfo) bool {
	// Open the database connection
	db, err := sql.Open("sqlite3", "data/dot.db")
	if err != nil {
		log.Fatal("Failed to open database:", err)
	}
	defer db.Close()

	readAccount := "SELECT username FROM account WHERE username = ?"
	rows, err := db.Query(readAccount, inpute.Username)
	if err != nil {
		log.Fatal("Query failed:", err)
	}
	defer rows.Close()

	if !rows.Next() {
		insertUserSQL := `INSERT INTO account (username, email, password) VALUES (?, ?, ?)`
		_, err = db.Exec(insertUserSQL, inpute.Username, inpute.Email, inpute.Password)
		if err != nil {
			log.Fatal("Failed to insert user:", err)
		}
		return true
	}
	return false
}

func Login(inpute LoginInfo) bool {
	// Open the database connection
	db, err := sql.Open("sqlite3", "data/dot.db")
	if err != nil {
		log.Fatal("Failed to open database:", err)
	}
	defer db.Close()

	readAccount := "SELECT username FROM account WHERE username = ?"
	rows, err := db.Query(readAccount, inpute.Username)
	if err != nil {
		log.Fatal("Query failed:", err)
	}
	defer rows.Close()

	if !rows.Next() {
		return false
	} else {
		readAccount := "SELECT password FROM account WHERE password = ?"
		rows, err := db.Query(readAccount, inpute.Password)
		if err != nil {
			log.Fatal("Query failed: ", err)
		}
		defer rows.Close()

		if !rows.Next() {
			return false
		}
	}
	return true
}

func inacessible (inpute DotConnect, row int, col int) bool {
	stuckPoint := 0
	if row-1 < 0 || (inpute.Board[row-1][col] == 1) {
		stuckPoint += 1
	}
	if row+1 >= len(inpute.Board) || (inpute.Board[row+1][col] == 1) {
		stuckPoint += 1
	}
	if col-1 < 0 || (inpute.Board[row][col-1] == 1) {
		stuckPoint += 1
	}
	if col+1 >= len(inpute.Board[0]) || (inpute.Board[row][col+1] == 1) {
		stuckPoint += 1
	}
	if (stuckPoint >= 4) {
		return true
	}
	return false
}

func isInacessible (inpute DotConnect) bool {
	for i := 0; i < len(inpute.Board); i++ {
		for j := 0; j < len(inpute.Board[i]); j++ {
			if (inacessible(inpute,i,j) && inpute.Board[i][j] == 0) {
				return true
			}
		}
	}
	return false
}

func Solve(inpute DotConnect) [][]int {
	if (isInacessible(inpute)) {
		fmt.Println("Inacessible")
		return [][]int{}
	}

	back = false
	path = [][]int{}
	// fmt.Println(inpute.Board)
	supposedFilled = 0
	toBeFilled := 0
	for i := 0; i < len(inpute.Board); i++ {
		for j := 0; j < len(inpute.Board[i]); j++ {
			if inpute.Board[i][j] == 0 {
				supposedFilled += 1
				// fmt.Println(i,j)
			} else if inpute.Board[i][j] == 2 {
				currentPos = []int{i, j}
			}
		}
	}

	// fmt.Println(currentPos)
	// fmt.Println(inpute.Board)

	var toBePath [][]int

	GoSearch(inpute, toBeFilled, currentPos, toBePath, currentPos)

	return path
}

func checkBoundary(inpute DotConnect, row int, col int, prevPos []int) int {
	stuckPoint := 0
	if row-1 < 0 || (inpute.Board[row-1][col] != 0 && row-1 != prevPos[0] && col == prevPos[1]) {
		stuckPoint += 1
	}
	if row+1 >= len(inpute.Board) || (inpute.Board[row+1][col] != 0 && row+1 != prevPos[0] && col == prevPos[1]) {
		stuckPoint += 1
	}
	if col-1 < 0 || (inpute.Board[row][col-1] != 0 && row == prevPos[0] && col-1 != prevPos[1]) {
		stuckPoint += 1
	}
	if col+1 >= len(inpute.Board[0]) || (inpute.Board[row][col+1] != 0 && row == prevPos[0] && col+1 != prevPos[1]) {
		stuckPoint += 1
	}
	return stuckPoint
}

func isTwoEnded(inpute DotConnect, prevPos []int) bool {
	ends := 0
	for i := 0; i < len(inpute.Board); i++ {
		for j := 0; j < len(inpute.Board[i]); j++ {
			if (checkBoundary(inpute, i, j, prevPos) >= 3 && inpute.Board[i][j] == 0) {
				ends += 1
			}
			if ends >= 2 || checkBoundary(inpute, i, j, prevPos) == 4 {
				return true
			}
		}
	}
	return false
}

func seeSplitVert(inpute DotConnect, edge int) bool {
	startSplit := false
	foundSplit := false
	// fmt.Println("VERT")
	for i := 0; i < len(inpute.Board); i++ {
		// fmt.Println(inpute.Board[i][edge], i, edge)
		if inpute.Board[i][edge] == 0 {
			startSplit = true
		}
		if inpute.Board[i][edge] == 2 && startSplit {
			foundSplit = true
		}
		if inpute.Board[i][edge] == 0 && foundSplit {
			return true
		}
	}
	return false
}

func seeSplitHorz(inpute DotConnect, edge int) bool {
	startSplit := false
	foundSplit := false
	// fmt.Println("HORZ")
	for i := 0; i < len(inpute.Board[edge]); i++ {
		// fmt.Println(inpute.Board[edge][i], edge, i)
		if inpute.Board[edge][i] == 0 {
			startSplit = true
		}
		if inpute.Board[edge][i] == 2 && startSplit {
			foundSplit = true
		}
		if inpute.Board[edge][i] == 0 && foundSplit {
			return true
		}
	}
	return false
}

func isFullVert(inpute DotConnect, edge int) bool {
	for i := 0; i < len(inpute.Board); i++ {
		if (inpute.Board[i][edge] == 0) {
			return false
		}
	}
	return true
}

func isFullHorz(inpute DotConnect, edge int) bool {
	for i := 0; i < len(inpute.Board[edge]); i++ {
		if (inpute.Board[edge][i] == 0) {
			return false
		}
	}
	return true
}

func GoSearch(inpute DotConnect, filled int, currentPos []int, peth [][]int, prevPos []int) {
	// fmt.Println(peth)
	if filled == supposedFilled {
		// fmt.Println("YES")
		back = true
		path = peth
		return
	}

	if isTwoEnded(inpute, prevPos) {
		// fmt.Println(currentPos,prevPos)
		return
	}

	// if (len(peth) >= 2) {
	// 	if (peth[0][0] == 2 && peth[0][1] == 0 && peth[1][0] == 3 && peth[1][1] == 0) {
	// 		fmt.Println(peth)
	// 	}
	// }

	// fmt.Println(peth)


	if currentPos[0] == 0 {
		// fmt.Println(peth)
		if seeSplitHorz(inpute, 0) && isFullVert(inpute, prevPos[1]) {
			// fmt.Println("RET N")
			return
		}
	}

	if currentPos[0] == len(inpute.Board)-1 {
		// fmt.Println(peth)
		if seeSplitHorz(inpute, len(inpute.Board)-1) && isFullVert(inpute, prevPos[1]) {
			// fmt.Println("RET S")
			return
		}
	}

	if currentPos[1] == 0 {
		// fmt.Println(peth)
		if seeSplitVert(inpute, 0) && isFullHorz(inpute, prevPos[0]) {
			// fmt.Println("RET W")
			return
		}
	}

	if currentPos[1] == len(inpute.Board[0])-1 {
		// fmt.Println(peth)
		if seeSplitVert(inpute, len(inpute.Board[0])-1) && isFullHorz(inpute,prevPos[0]) {
			// fmt.Println("RET E")
			return
		}
	}

	filled += 1
	inpute.Board[currentPos[0]][currentPos[1]] = 2

	// if (filled <= 5) {
	// 	fmt.Println(currentPos)
	// 	fmt.Println(peth)
	// 	fmt.Println(filled)
	// }
	if currentPos[1]+1 < len(inpute.Board[0]) && inpute.Board[currentPos[0]][currentPos[1]+1] == 0 {
		// fmt.Println("E", peth)
		if back {
			return
		}
		GoSearch(inpute, filled, []int{currentPos[0], currentPos[1] + 1}, append(peth, []int{currentPos[0], currentPos[1] + 1}), currentPos)
	}
	if currentPos[1]-1 >= 0 && inpute.Board[currentPos[0]][currentPos[1]-1] == 0 {
		// fmt.Println("W", peth)
		if back {
			return
		}
		GoSearch(inpute, filled, []int{currentPos[0], currentPos[1] - 1}, append(peth, []int{currentPos[0], currentPos[1] - 1}), currentPos)
	}
	if currentPos[0]+1 < len(inpute.Board) && inpute.Board[currentPos[0]+1][currentPos[1]] == 0 {
		// fmt.Println("S", peth)
		if back {
			return
		}
		GoSearch(inpute, filled, []int{currentPos[0] + 1, currentPos[1]}, append(peth, []int{currentPos[0] + 1, currentPos[1]}), currentPos)
	}
	if currentPos[0]-1 >= 0 && inpute.Board[currentPos[0]-1][currentPos[1]] == 0 {
		// fmt.Println("N", peth)
		if back {
			return
		}
		GoSearch(inpute, filled, []int{currentPos[0] - 1, currentPos[1]}, append(peth, []int{currentPos[0] - 1, currentPos[1]}), currentPos)
	}
	inpute.Board[currentPos[0]][currentPos[1]] = 0
	// fmt.Println(currentPos)
	// if (currentPos[0] == 4 && currentPos[1] == 4) {
	// 	fmt.Println(inpute.Board[currentPos[0]-1][currentPos[1]])
	// }
}

func StoreWin(inpute WinInfo) {
	// Open the database connection
	db, err := sql.Open("sqlite3", "data/dot.db")
	if err != nil {
		log.Fatal("Failed to open database:", err)
	}
	defer db.Close()

	var count int
	err = db.QueryRow("SELECT COUNT(*) FROM leaderboard").Scan(&count)
	if err != nil {
		log.Fatal("Query failed:", err)
	}

	insertUserSQL := `INSERT INTO leaderboard (leaderboard_id, username, time, difficulty, gamemode) VALUES (?, ?, ?, ?, ?)`
	_, err = db.Exec(insertUserSQL, count+1, inpute.Username, inpute.Time, inpute.Difficulty, inpute.GameMode)
	if err != nil {
		log.Fatal("Failed to insert user:", err)
	}
}

func Display(inpute DisplayInfo) [][]interface{} {
	db, err := sql.Open("sqlite3", "data/dot.db")
	if err != nil {
		log.Fatal("Failed to open database:", err)
	}
	defer db.Close()

	readAccount := "SELECT username, time FROM leaderboard WHERE difficulty = ? AND gamemode = ? ORDER BY time LIMIT 5"
	rows, err := db.Query(readAccount, inpute.Difficulty, inpute.GameMode)
	if err != nil {
		log.Fatal("Query failed:", err)
	}
	defer rows.Close()

	var toBeReturned [][]interface{}

	for rows.Next() {
		var username string
		var time int
		if err := rows.Scan(&username, &time); err != nil {
			log.Fatal("Failed to scan row:", err)
		}
		inserter := []interface{}{username, time}
		toBeReturned = append(toBeReturned, inserter)
	}

	if err := rows.Err(); err != nil {
		log.Fatal("Rows iteration error:", err)
	}

	return toBeReturned
}
