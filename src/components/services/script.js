class Service {
    _api_key = '321b6a4c8922d2c44b16ca173c577ce3';
    _link_movies = `https://api.themoviedb.org/3/movie/popular?api_key=${this._api_key}&language=uk`;
    _link_series = `https://api.themoviedb.org/3/tv/popular?api_key=${this._api_key}&language=uk`;
    _linktranding = `https://api.themoviedb.org/3/trending/all/week?api_key=${this._api_key}&language=uk`;
    _link_upcoming = `https://api.themoviedb.org/3/movie/upcoming?api_key=${this._api_key}&language=uk&page=1&region=UA`;
    _link_genres = `https://api.themoviedb.org/3/genre/movie/list?api_key=${this._api_key}&language=uk`;

    _image_url = 'https://image.tmdb.org/t/p/original';


    async getData(list, page) {
        let info = null;
        switch (list) {

            case 'series':
                info = await fetch(`${this._link_series}&page=${page}`);
                break;
            case 'new':
                info = await fetch(`${this._linktranding}&page=${page}`);
                break;
            case 'movie':
            default:
                info = await fetch(`${this._link_movies}&page=${page}`);
                break;
        }
        if (info.status > 300 || info.status < 199) {
            throw new Error(`Сталося помилка ${info.status.text}:${info.status}`);
        }
        return await info.json();
    }

    async getTrending(page) {
        if (!page) page = 1;
        const info = await fetch(`${this._linktranding}&page=${page}`);
        if (info.status > 300 || info.status < 199) {
            throw new Error(`Сталося помилка ${info.status.text}:${info.status}`);
        }
        return await info.json();
    }

    async getUpcoming() {
        const info = await fetch(`${this._link_upcoming}`);
        if (info.status > 300 || info.status < 199) {
            throw new Error(`Сталося помилка ${info.status.text}:${info.status}`);
        }
        return await info.json();
    }

    async getDetails(cat, id) {
        const _link_details = `https://api.themoviedb.org/3/${cat}/${id}?api_key=${this._api_key}&language=uk`;
        const info = await fetch(`${_link_details}`);
        if (info.status > 300 || info.status < 199) {
            throw new Error(`Сталося помилка ${info.status.text}:${info.status}`);
        }

        return await info.json();
    }

    async getVideo(info_cat, id) {
        let videoid = await fetch(`https://api.themoviedb.org/3/${info_cat}/${id}/videos?api_key=${this._api_key}&language=uk`);

        let vid = null;
        await videoid.json().then((array) => {
            (array.results).map((item) => {
                return vid = item.key;
            })
        })
        if (vid === null) {
            let videoid = await fetch(`https://api.themoviedb.org/3/${info_cat}/${id}/videos?api_key=${this._api_key}`);
            await videoid.json().then((array) => {
                (array.results).map((item) => {
                    return vid = item.key;
                })
            })
        }
        return (vid) ? `https://www.youtube.com/embed/${vid}?autoplay=1&showinfo=0` : (vid);
    }

    async getCredits(list, id) {
        const _link_credits = `https://api.themoviedb.org/3/${list}/${id}/credits?api_key=${this._api_key}&language=uk`;

        let credits = await fetch(_link_credits);
        return await credits.json();
    }

    async getGenres() {
        let genresList = await fetch(this._link_genres);
        if (genresList.status > 300 || genresList.status < 199) {
            throw new Error(`Сталося помилка ${genresList.status.text}:${genresList.status}`);
        }
        return await genresList.json();
    }

}
function getImage(img) {
    const url = `https://image.tmdb.org/t/p/original${img}`;
    if (img === null)
        return null
    else return url;
}



function langChanger(lang) {
    const langs = {
        'aa': 'Афарська',
        'ab': 'Абхазька',
        'ae': 'Авестійська',
        'af': 'Африкаанс',
        'ak': 'Акан (мова)',
        'am': 'Амхара',
        'an': 'Арагонська',
        'ar': 'Арабська',
        'as': 'Ассамська',
        'av': 'Аварська',
        'ay': 'Аймара',
        'az': 'Азербайджанська',
        'ba': 'Башкирська',
        'be': 'Білоруська',
        'bg': 'Болгарська',
        'bh': 'Біхарі',
        'bi': 'Біслама',
        'bm': 'Бамбара',
        'bn': 'Бенгальська',
        'bo': 'Тибетська',
        'br': 'Бретонська',
        'bs': 'Боснійська',
        'ca': 'Каталонська',
        'ce': 'Чеченська',
        'ch': 'Чаморро',
        'co': 'Корсиканська',
        'cr': 'Мова крі',
        'cs': 'Чеська',
        'cu': 'Церковнослов’янська',
        'cv': 'Чуваська',
        'cy': 'Валлійська',
        'da': 'Данська',
        'de': 'Німецька',
        'dv': 'Дівехі',
        'dz': 'Дзонґ-ке',
        'ee': 'Еве',
        'el': 'Грецька',
        'en': 'Англійська',
        'eo': 'Есперанто',
        'es': 'Іспанська',
        'et': 'Естонська',
        'eu': 'Баскська',
        'fa': 'Перська',
        'ff': 'Фула',
        'fi': 'Фінська',
        'fj': 'Фіджі',
        'fo': 'Фарерська',
        'fr': 'Французька',
        'fy': 'Західно-фризька',
        'ga': 'Ірландська',
        'gd': 'Шотландська гельська',
        'gl': 'Галісійська',
        'gn': 'Гуарані',
        'gu': 'Гуджараті',
        'gv': 'Менська',
        'ha': 'Хауса',
        'he': 'Іврит',
        'hi': 'Гінді',
        'ho': 'Гірі-моту',
        'hr': 'Хорватська',
        'ht': 'Гаїтянська',
        'hu': 'Угорська',
        'hy': 'Вірменська',
        'hz': 'Гереро',
        'ia': 'Інтерлінгва',
        'id': 'Індонезійська',
        'ie': 'Окциденталь',
        'ig': 'Ігбо',
        'ii': 'Сичуань Йї',
        'ik': 'Інупіак (мова)',
        'io': 'Ідо',
        'is': 'Ісландська',
        'it': 'Італійська',
        'iu': 'Інуктітут',
        'ja': 'Японська',
        'jv': 'Яванська',
        'ka': 'Грузинська',
        'kg': 'Конголезька',
        'ki': 'Кікуйю',
        'kj': 'Кунама',
        'kk': 'Казахська',
        'kl': 'Гренландська',
        'km': 'Кхмерська',
        'kn': 'Каннада',
        'ko': 'Корейська',
        'kr': 'Канурі',
        'ks': 'Кашмір',
        'ku': 'Курдська',
        'kv': 'Комі',
        'kw': 'Корнська',
        'ky': 'Киргизька',
        'la': 'Латинська',
        'lb': 'Люксембурзька',
        'lg': 'Луганда',
        'li': 'Лімбурзька',
        'ln': 'Лінґала',
        'lo': 'Лаоська',
        'lt': 'Литовська',
        'lu': 'Луба-катанга',
        'lv': 'Латиська',
        'mg': 'Малагасійська',
        'mh': 'Маршальська',
        'mi': 'Маорі',
        'mk': 'Македонська',
        'ml': 'Малаялам',
        'mn': 'Монгольська',
        'mr': 'Маратхі',
        'ms': 'Малайська',
        'mt': 'Мальтійська',
        'my': 'Бірманська',
        'na': 'Науру',
        'nb': 'Букмол',
        'nd': 'Північна ндебеле',
        'ne': 'Непальська',
        'ng': 'Ндонга',
        'nl': 'Нідерландська',
        'nn': 'Нюношк',
        'no': 'Норвезька',
        'nr': 'Південна ндебеле',
        'nv': 'Навахо',
        'ny': 'Ньянджа',
        'oc': 'Окситанська',
        'oj': 'Оджибве',
        'om': 'Орома',
        'or': 'Орія',
        'os': 'Осетинська',
        'pa': 'Панджабі',
        'pi': 'Палі',
        'pl': 'Польська',
        'ps': 'Пушту',
        'pt': 'Португальська',
        'qu': 'Кечуа',
        'rm': 'Ретороманська',
        'rn': 'Кірундійська',
        'ro': 'Румунська; Молдовська',
        'ru': 'ращистська-дуболомна',
        'rw': 'Кінаруанда',
        'ry': 'Русинська',
        'sa': 'Санскрит',
        'sc': 'Сардинська',
        'sd': 'Сіндхі',
        'se': 'Північно-саамська',
        'sg': 'Санго',
        'sh': 'Сербо-хорватська',
        'si': 'Сингальська',
        'sk': 'Словацька',
        'sl': 'Словенська',
        'sm': 'Самоанська',
        'sn': 'Шона',
        'so': 'Сомалі',
        'sq': 'Албанська',
        'sr': 'Сербська',
        'ss': 'Свазі',
        'st': 'Сесото',
        'su': 'Сунданська',
        'sv': 'Шведська',
        'sw': 'Свахілі',
        'ta': 'Тамільська',
        'te': 'Телугу',
        'tg': 'Таджицька',
        'th': 'Тайська',
        'ti': 'Тигрінья',
        'tk': 'Туркменська',
        'tl': 'Тагалог',
        'tn': 'Сетсвана',
        'to': 'Тонганська',
        'tr': 'Турецька',
        'ts': 'Тсонґа',
        'tt': 'Татарська',
        'tw': 'Чві',
        'ty': 'Таїтянська',
        'ug': 'Уйгурська',
        'uk': 'Українська',
        'ur': 'Урду',
        'uz': 'Узбецька',
        've': 'Венда',
        'vi': 'В&#39;єтнамська',
        'vo': 'Волапюк',
        'wa': 'Валлонська',
        'wo': 'Волоф',
        'xh': 'Ісікхоса',
        'yi': 'Їдиш',
        'yo': 'Йоруба',
        'za': 'Чжуан',
        'zh': 'Китайська',
        'zu': 'Зулу'
    }
    return langs[lang];
}

const toDate = (date) => {
    const monthes = ["Січня", "Лютого", "Березня", "Квітня", "Травня", "Червня", "Липня", "Серпня", "Вересня", "Жовтня", "Листопада", "Грудня"]
    let date1 = date.split('-');
    console.log(date1)
    return `${date1[2]} ${monthes[Number(date1[1] - 1)]} ${date1[0]}`;
}

export { Service, getImage, toDate, langChanger }