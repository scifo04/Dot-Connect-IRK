package work

type RegisterInfo struct {
	Email string `json:"email"`
	Password string `json:"password"`
	Username string `json:"username"`
}

type LoginInfo struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type DotConnect struct {
	Board [][]int `json:"board"`
}

type WinInfo struct {
	Username string `json:"username"`
	Time int `json:"time"`
	Difficulty string `json:"difficulty"`
	GameMode string `json:"gamemode"`
}

type DisplayInfo struct {
	Difficulty string `json:"difficulty"`
	GameMode string `json:"gamemode"`
}