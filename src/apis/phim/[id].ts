/* eslint-disable @typescript-eslint/no-non-null-assertion */

import type { Cheerio, CheerioAPI, Element } from "cheerio"
import { load } from "cheerio"

import { getHTML } from "../../helpers/getHTML"
import { getInfoAnchor } from "../../helpers/getInfoAnchor"
import { getInfoTPost } from "../../helpers/getInfoTPost"
import { getPathName } from "../../helpers/getPathName"
import { int } from "../../helpers/int"

function findInfo($: CheerioAPI, infoList: Cheerio<Element>, q: string) {
  return $(
    infoList.toArray().find((item) => {
      return $(item).find("strong").text().toLowerCase().startsWith(q)
    })
  )
}

export async function PhimId(seasonId: string) {
  const $ = load(await getHTML(`/phim/${seasonId}/`))
  const now = Date.now()

  const name = $(".Title:eq(0)").text()
  const othername = $(".SubTitle:eq(0)").text()

  const image = $(".Image img").attr("src")
  const poster = $(".TPostBg img").attr("src")
  const pathToView = $(".watch_button_more")
    ? getPathName($(".watch_button_more").attr("href")!)
    : null
  const description = $(".Description:eq(0)").text().trim()
  const rate = parseInt($("#average_score:eq(0)").text())
  // eslint-disable-next-line camelcase
  const count_rate = parseInt($(".num-rating:eq(0)").text())
  const duration = $(".AAIco-access_time:eq(0)").text()
  const yearOf = parseInt($(".AAIco-date_range:eq(0) > a").text())
  const views = int(
    $(".AAIco-remove_red_eye:eq(0)")
      .text()
      .match(/[\d,]+/)?.[0]
      ?.replace(/,/g, "")
  )!
  const season = $(".season_item > a")
    .map((_i, item) => getInfoAnchor($(item)))
    .toArray()
  const genre = $(".breadcrumb > li > a")
    .slice(1, -1)
    .map((_i, item) => getInfoAnchor($(item)))
    .toArray()
  const quality = $(".Qlty:eq(0)").text()

  // ==== info ====
  const infoListLeft = $(".mvici-left > .InfoList > .AAIco-adjust")
  const infoListRight = $(".mvici-right > .InfoList > .AAIco-adjust")
  const status = findInfo($, infoListLeft, "trạng thái")
    .text()
    .split(":", 2)[1]
    ?.trim()
  const authors = findInfo($, infoListLeft, "đạo diễn")
    .find("a")
    .map((_i, item) => getInfoAnchor($(item)))
    .toArray()
  const contries = findInfo($, infoListLeft, "quốc gia")
    .find("a")
    .map((_i, item) => getInfoAnchor($(item)))
    .toArray()
  const follows = int(
    findInfo($, infoListLeft, "số người theo dõi")
      .text()
      .split(":", 2)[1]
      ?.trim()
      ?.replace(/,/g, "")
  )!
  const language = findInfo($, infoListRight, "ngôn ngữ")
    .text()
    .split(":", 2)[1]
    ?.trim()
  const studio = findInfo($, infoListRight, "studio")
    .text()
    .split(":", 2)[1]
    ?.trim()
  const seasonOf = getInfoAnchor(findInfo($, infoListRight, "season").find("a"))
  const trailer = $("#Opt1 iframe").attr("src")!

  const followed = $(".added").length > 0

  const toPut = $(".MovieListRelated .TPostMv")
    .map((_i, item) => getInfoTPost($(item), now))
    .toArray()

  return {
    name,
    othername,
    image,
    poster,
    pathToView,
    description,
    rate,
    // eslint-disable-next-line camelcase
    count_rate,
    duration,
    yearOf,
    views,
    season,
    genre,
    quality,
    status,
    authors,
    contries,
    follows,
    language,
    studio,
    seasonOf,
    trailer,
    followed,
    toPut,
  }
}
