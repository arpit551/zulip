const FetchStatus = function () {

    const self = {};

    let loading_older = false;
    let loading_newer = false;
    let found_oldest = false;
    let found_newest = false;
    let history_limited = false;

    self.start_older_batch = function (opts) {
        loading_older = true;
        if (opts.update_loading_indicator) {
            message_scroll.show_loading_older();
        }
    };

    self.finish_older_batch = function (opts) {
        loading_older = false;
        found_oldest = opts.found_oldest;
        history_limited = opts.history_limited;
        if (opts.update_loading_indicator) {
            message_scroll.hide_loading_older();
        }
    };

    self.can_load_older_messages = function () {
        return !loading_older && !found_oldest;
    };

    self.has_found_oldest = function () {
        return found_oldest;
    };

    self.history_limited = function () {
        return history_limited;
    };

    self.start_newer_batch = function (opts) {
        loading_newer = true;
        if (opts.update_loading_indicator) {
            message_scroll.show_loading_newer();
        }
    };

    self.finish_newer_batch = function (opts) {
        loading_newer = false;
        found_newest = opts.found_newest;
        if (opts.update_loading_indicator) {
            message_scroll.hide_loading_newer();
        }
    };

    self.can_load_newer_messages = function () {
        return !loading_newer && !found_newest;
    };

    self.has_found_newest = function () {
        return found_newest;
    };

    return self;

};
module.exports = FetchStatus;
window.FetchStatus = FetchStatus;
