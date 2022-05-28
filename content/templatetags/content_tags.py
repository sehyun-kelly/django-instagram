from django import template
from django.template.defaultfilters import stringfilter

register = template.Library()


@register.filter
@stringfilter
def upto(value):
    result = '';

    if 'year' in value:
        result = value.split('year')[0]
        if '1' in result and len(result) == 2:
            return result + 'YEAR'
        else:
            return result + 'YEARS'

    if 'day' in value:
        result = value.split('day')[0]
        if '1' in result and len(result) == 2:
            return result + 'DAY'
        else:
            return result + 'DAYS'

    if 'hour' not in value and 'minute' in value:
        result = value.split('minute')[0]
        if '1' in result and len(result) == 2:
            return result + 'MINUTE'
        else:
            return result + 'MINUTES'

    result = value.split('hour')[0]
    if '1' in result and len(result) == 2:
        return result + 'HOUR'
    else:
        return result + 'HOURS'

upto.is_safe = True
