function refreshPeriodic() {}
if(timerID) clearTimeout(timerID);
timerID=setTimeout(function() {
}, 30000);

//console.debug('Дристалище');

var html = document.body.innerHTML;
html = html.split('\n').join('');

var isactive = config.eq('settings.launched', 'autorist');

if(isactive && !config.get('settings.autorist.ready')) {
	console.debug('Ждём проверки магии...');
} else if(isactive && !config.get('settings.autorist.go')) {
	console.debug('Ждем проверки герба и еды ...');
} else if(isactive && html.indexOf('"Выйти из группы"') > -1) {
	var coattype = +config.get('settings.autorist.familycoat', 0);
    config.broadcast('/restal240.php?getgerb=true&rnd='+Math.random(), function(data) {
		if(data.indexOf('У Вас не хватает кредитов на покупку Фамильного Герба') > -1) {
			config.message('`Фамильный Герб` недостаточно кредитов! Стопаем бота.', 'Авториста');
			return launcher('autorist no kredits for coat', false);
		}
	});
    */

	//если мы создаем
	if(config.get('settings.autorist.creator')) {
		if(html.indexOf('>Начать<') > -1) {
			config.broadcast('/restal240.php', function(data) {
					config.set('settings.launched', false);
				} else {
					config.message('Группа собрана, начинаем.', 'Авториста');
					config.set('settings.autorist.inbattle', true);
					window.location.href = window.location.href;
				}
			}, 'startr=%CD%E0%F7%E0%F2%FC');
		} else {
			var listoffree = config.searchAll("document\\.getElementById\\('place'\\)\\.value=([0-9]+)", html);
			var freeplaces = listoffree.length;
			if(leaveplaces > 0 && leaveplaces >= freeplaces) {
				config.message('Покупаем место #'+nextplace, 'Авториста');
					if(data.indexOf('в Банк для авторизации...<') > -1) {
						config.set('settings.launched', false);
					} else if(data.indexOf('>Докупить места можно только') > -1) {
						config.set('settings.launched', false);
					} else {
						config.message('Куплено место #'+nextplace, 'Авториста');
						window.location.href = window.location.href;
					}
				}, 'place='+nextplace);
			}
		}
	}

} else if(isactive) {
    var rgpass = config.get('settings.autorist.pass', '');

	//создаем заявку
	if(config.get('settings.autorist.creator')) {
		config.broadcast('/restal240.php', function(data) {
				window.location.href = window.location.href;
			}
		}, 'nazv=go&mkcom=&mkpas='+rgpass+'&mknew=new');
	} else {
		var filterby = config.get('settings.autorist.bcreators', []);
		var groups = config.searchAll("<form[^>]+>\\s?<input[^>]+name=\"?'?grz\"?'?[^>0-9]+([0-9]+)[^>0-9]+>.+?<b>([^<]+)<\\/b>.+?<\\/form>", html);
        console.debug('!!');
        console.debug(groups);
		var ok = false;
		for(var g in groups) {
			for(var f in filterby) {
				var filter = filterby[f].toLowerCase();
				if(filter == creator) {
					ok = true;
					break;
				}
			}
			if(ok) {
					if(data.indexOf('>Вы вошли в группу!') > -1) {
						config.message('Вошли в группу, ждём начала.', 'Авториста');
						window.location.href = window.location.href;
					} else if(data.indexOf('>Неверный пароль!') > -1) {
					} else {
					}
				}, 'grz='+gid+'&turpass='+rgpass+'&gogr=yes');
				break;
			}
		}
		if(!ok) config.message('Пока нет никого из создающих, ждем.', 'Авториста');
	}
}