import { useState } from "react";

export const useConst = <T>(initialState: T | (() => T)) =>
	useState(initialState)[0];
