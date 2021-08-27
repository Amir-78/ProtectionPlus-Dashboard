const axios = require('axios')

export function getUserDetals() {
    return axios.get('https://api.ppbot.cc/user', { withCredentials: true })
}

export function getGuilds() {
    return axios.get('https://api.ppbot.cc/user/guilds', { withCredentials: true })
}

export function getGuildsArray() {
    return axios.get('https://api.ppbot.cc/user/guilds/array', { withCredentials: true })
}

export function getDetals() {
    return axios.get('https://api.ppbot.cc/bot/detals', { withCredentials: true })
}

export function getGuild(guildID) {
    return axios.get(`https://api.ppbot.cc/guild/${guildID}`, { withCredentials: true })
}

export function getGuildInfo(guildID) {
    return axios.get(`https://api.ppbot.cc/guild/${guildID}/info`, { withCredentials: true })
}

export function getGuildAdmins(guildID) {
    return axios.get(`https://api.ppbot.cc/guild/${guildID}/admins`, { withCredentials: true })
}

export function getGuildPrefix(guildID) {
    return axios.get(`https://api.ppbot.cc/guild/${guildID}/prefix`, { withCredentials: true })
}

export function getGuildLogs(guildID) {
    return axios.get(`https://api.ppbot.cc/guild/${guildID}/logs`, { withCredentials: true })
}

export function getGuildAutorole(guildID) {
    return axios.get(`https://api.ppbot.cc/guild/${guildID}/autorole`, { withCredentials: true })
}

export function getGuildChannels(guildID) {
    return axios.get(`https://api.ppbot.cc/guild/${guildID}/channels`, { withCredentials: true })
}

export function getGuildRoles(guildID) {
    return axios.get(`https://api.ppbot.cc/guild/${guildID}/roles`, { withCredentials: true })
}

export function getGuildEmojies(guildID) {
    return axios.get(`https://api.ppbot.cc/guild/${guildID}/emojies`, { withCredentials: true })
}

export function getGuildSuggestions(guildID) {
    return axios.get(`https://api.ppbot.cc/guild/${guildID}/suggestions`, { withCredentials: true })
}

export function getGuildWelcomer(guildID) {
    return axios.get(`https://api.ppbot.cc/guild/${guildID}/welcomer`, { withCredentials: true })
}

export function getGuildProtection(guildID) {
    return axios.get(`https://api.ppbot.cc/guild/${guildID}/protection`, { withCredentials: true })
}

export function getBotGuilds() {
    return axios.get(`https://api.ppbot.cc/bot/guilds`, { withCredentials: true })
}

export function getProfile(userID, id, name) {
    return axios.get(`https://api.ppbot.cc/profile/${userID}/${id}/${name}`, { withCredentials: true })
}

export function getData(userID) {
    return axios.get(`https://api.ppbot.cc/data/${userID}`, { withCredentials: true })
}

export function getUserBackground(userID) {
    return axios.get(`https://api.ppbot.cc/user/${userID}/background`, { withCredentials: true })
}