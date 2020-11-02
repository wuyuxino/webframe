function timeFormate(time, duration) {
	let b_time = new Date(time).getTime()
	let d_time = duration * 30 * 24 * 60 * 60 * 1000
	let e_time = b_time + d_time
	let end_time = new Date(e_time)
	return end_time.toLocaleDateString()
}


export {
	timeFormate,

}