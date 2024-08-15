package main

import (
	work "dot/lib"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"
)

var regInfo work.RegisterInfo

var logInfo work.LoginInfo

var dotInfo work.DotConnect

var winInfo work.WinInfo

var disInfo work.DisplayInfo

var recipient map[string]interface{}

var taker [][]interface{}

var currApproval bool

var path [][]int

func handleInsert(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	w.Header().Set("Access-Control-Allow-Methods", "POST")

	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	requestBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read request body", http.StatusInternalServerError)
		return
	}

	if err := json.Unmarshal(requestBody, &recipient); err != nil {
		http.Error(w, "Failed to parse request body", http.StatusBadRequest)
		return
	}

	fmt.Println("Request body:", string(requestBody))

	if (recipient["command"] == "register") {
		regInfo.Email = recipient["email"].(string)
		regInfo.Password = recipient["password"].(string)
		regInfo.Username = recipient["username"].(string)
		currApproval = work.Register(regInfo)

		tempResponse := struct {
			Username string `json:"currUsername"`
			Approval bool `json:"currApproval"`
		}{
			Username: regInfo.Username,
			Approval: currApproval,
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(tempResponse)
	} else if (recipient["command"] == "login") {
		logInfo.Username = recipient["username"].(string)
		logInfo.Password = recipient["password"].(string)
		currApproval = work.Login(logInfo)

		tempResponse := struct {
			Username string `json:"currUsername"`
			Approval bool `json:"currApproval"`
		}{
			Username: logInfo.Username,
			Approval: currApproval,
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(tempResponse)
	} else if (recipient["command"] == "solve") {
		arraye, ok := recipient["arraye"].([]interface{})
		if !ok {
			http.Error(w, "Invalid arraye format", http.StatusBadRequest)
			return
		}
	
		board := make([][]int, len(arraye))
	
		for i, row := range arraye {
			rowSlice, ok := row.([]interface{})
			if !ok {
				http.Error(w, "Invalid row format", http.StatusBadRequest)
				return
			}
	
			board[i] = make([]int, len(rowSlice))
			for j, elem := range rowSlice {
				num, ok := elem.(float64)
				if !ok {
					http.Error(w, "Invalid element format", http.StatusBadRequest)
					return
				}
				board[i][j] = int(num)
			}
		}

		dotInfo.Board = board
		start := time.Now()
		path = work.Solve(dotInfo)
		end := time.Since(start)
		fmt.Println(path)
		fmt.Println(end.Milliseconds(), "ms")

		tempResponse := struct {
			Path [][]int `json:"path"`
		}{
			Path: path,
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(tempResponse)
	} else if (recipient["command"] == "store") {
		winInfo.Username = recipient["username"].(string)
		winInfo.Time = int(recipient["time"].(float64))
		winInfo.Difficulty = recipient["difficulty"].(string)
		winInfo.GameMode = recipient["gamemode"].(string)
		fmt.Println(winInfo)
		work.StoreWin(winInfo)
	} else if (recipient["command"] == "display") {
		disInfo.Difficulty = recipient["difficulty"].(string)
		disInfo.GameMode = recipient["gamemode"].(string)
		taker = work.Display(disInfo)
		tempResponse := struct {
			Leaders [][]interface{} `json:"leaders"`
		}{
			Leaders: taker,
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(tempResponse)
	}

	// fmt.Printf("Received data: %+v\n", pointDataGlobale)

	// var time_string string;
	// res,exec,len,lenks = back.Back_Main(gotInfo,300)
	
	// tempResponse := struct {
	// 	Lencs []string `json:"links"`
	// 	Exec int64 `json:"exec"`
	// 	Len int `json:"len"`
	// 	Lincs []string `json:"url"`
	// }{
	// 	Lencs: res,
	// 	Exec: exec,
	// 	Len: len,
	// 	Lincs: lenks,
	// }
	// responseData := struct {
	// 	Message     string   `json:"message"`
	// 	GottenPoints []backend.Point `json:"gottenPoint"`
	// 	ControlPoints []backend.Point `json:"controlPoint"`
	// 	Time_String string `json:"time_string"`
	// }{
	// 	Message:     "Received data successfully",
	// 	GottenPoints: gottenPoint,
	// 	ControlPoints: controlPoint,
	// 	Time_String: time_string,
	// }
}

func main() {
	http.HandleFunc("/", handleInsert)
	fmt.Println("Server listening on port 8000...")
	http.ListenAndServe(":8000", nil)
}
