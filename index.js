!function () {

    function headers_to_json(allHeaders) {
        var headersJson = {};


        var headersArray = allHeaders.trim().split(/[\r\n]+/);

        headersArray.forEach(function (line) {
            try {
                var parts = line.split(': ');
                var header = parts.shift();
                var value = parts.join(': ');

                // Transform header names
                var transformedHeader = header.toLowerCase().replace(/-/g, '_');
                headersJson[transformedHeader] = value;
            } catch (_e) {
                null
            }

        });
        return headersJson
    }

document.addEventListener("evn-run",function() {
    $qsall("[htp-tsk]").forEach(function (e) {
        if (e.getAttribute("extension-htp-tsk") == null) {
            e.setAttribute("extension-htp-tsk", "t")

            var self = e
            var thred = self.getAttribute("htp-tsk")
            var target = $qs(self.getAttribute("htp-t")) || self;
            var timeing = thred == "auto" ? false : (1000 * eval(thred))

            self.setAttribute("htp-tsk-on", true)
            target.setAttribute("htp-tsk-on", true)
            active(false)
            function active(timeing) {
                if (document.contains(self)) {
                    threading.call(self, timeing)
                }

            }

            function threading(timeing) {
                if (timeing) {
                    setTimeout(function () {
                        $htp.call(self, {}, {}, handler)
                    }, timeing)
                } else {
                    $htp.call(this, {}, {}, handler)
                }



            }

            function handler(respone) {
                var until = self.getAttribute("htp-tsk-until") || undefined
                var data_set = self.getAttribute("htp-tsk-set") || undefined
                var status = respone.status
                var text = respone.body
                var json = {}
                var header = headers_to_json(respone.http.getAllResponseHeaders())
                try {
                    json = JSON.parse(text)
                } catch (e_) {
                    null
                }
                self.setAttribute("htp-tsk-s", status)
                target.setAttribute("htp-tsk-s", status)

                try {
                    self.setAttribute("htp-tsk-json-s", json.status)
                    target.setAttribute("htp-tsk-json-s", json.status)

                } catch (e_) {
                    null
                }

                try {
                    if (eval(until)) {
                        if (data_set) {
                            if (respone.htp_data) {
                                $parserHTML(eval(data_set), respone.htp_data, respone.swap, respone.swap_s)
                            }

                        }
                        self.removeAttribute("htp-tsk-on")
                        target.removeAttribute("htp-tsk-on")
                        self.setAttribute("htp-tsk-done", true)
                        target.setAttribute("htp-tsk-done", true)
                        return null //end task
                    }
                } catch (e) {
                    null
                }

                if (!until && data_set) { //without end task realtime update data
                    if (respone.htp_data) {
                        try {
                            $parserHTML(eval(data_set), respone.htp_data, respone.swap, respone.swap_s)
                        }
                        catch (e_) {
                            null
                        }

                    }
                }

                //or and abort cancled task 
                if (self.getAttribute("htp-tsk-abort") != null) {
                    self.setAttribute("htp-tsk-cancled", true)
                    target.setAttribute("htp-tsk-cancled", true)
                    return null
                }
                active(timeing)


            }

        }
    });
});
}();   
