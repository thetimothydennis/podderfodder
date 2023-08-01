// he decodes html formatted characters
import he from 'he';

// strips HTML formatted characters and tags from input parameter
export const removeHTML = (content) => {
    content = content.replace(/(<([^>]+)>)/gi, "");
    content = content.replace(/(undefined)/gi, "");
    content = he.decode(content);
    return content;
};

// reformates input parameter from colon-separated time to seconds
export const deColonDuration = (duration) => {
    let durArr = duration.split(':')
    if (durArr.length < 3) {
        let durArr = duration.split(':');
        duration = Number(durArr[0] * 60);
        return duration;
    }
    else {
        let durArr = duration.split(':');
        duration = Number(durArr[0]) * 60;
        duration += Number(durArr[1]);
        duration = duration * 60;
        return duration;
    };
};