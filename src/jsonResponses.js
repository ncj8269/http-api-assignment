const respond = (request, response, status, object, acceptedTypes) => {
  response.writeHead(status, { 'Content-Type': acceptedTypes });
  response.write(object);
  response.end();
};

const success = (request, response, acceptedTypes) => {
  const respondMessage = {
    message: 'This is a successful response',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${respondMessage.message}</message>`;
    responseXML = `${responseXML}</response>`;

    return respond(request, response, 200, responseXML, 'text/xml');
  }

  const JSONstring = JSON.stringify(respondMessage);

  return respond(request, response, 200, JSONstring, 'application/json');
};

const badRequest = (request, response, acceptedTypes, params) => {
  const respondMessage = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    respondMessage.message = 'Missing valid query parameter set equal to true';
    respondMessage.id = 'badRequest';
    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${respondMessage.message}</message>`;
      responseXML = `${responseXML}</response>`;

      return respond(request, response, 400, responseXML, 'text/xml');
    }

    const JSONstring = JSON.stringify(respondMessage);

    return respond(request, response, 400, JSONstring, 'application/json');
  }

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${respondMessage.message}</message>`;
    responseXML = `${responseXML}</response>`;

    return respond(request, response, 200, responseXML, 'text/xml');
  }

  const JSONstring = JSON.stringify(respondMessage);

  return respond(request, response, 200, JSONstring, 'application/json');
};

const unauthorized = (request, response, acceptedTypes, params) => {
  const respondMessage = {
    message: 'Missing logged in param set to true',
  };

  if (!params.loggedIn || params.loggedIn !== 'true') {
    respondMessage.id = 'unauthorized';
    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${respondMessage.message}</message>`;
      responseXML = `${responseXML}</response>`;

      return respond(request, response, 401, responseXML, 'text/xml');
    }

    const JSONstring = JSON.stringify(respondMessage);

    return respond(request, response, 401, JSONstring, 'application/json');
  }

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${respondMessage.message}</message>`;
    responseXML = `${responseXML}</response>`;

    return respond(request, response, 200, responseXML, 'text/xml');
  }

  const JSONstring = JSON.stringify(respondMessage);

  return respond(request, response, 200, JSONstring, 'application/json');
};

const forbidden = (request, response, acceptedTypes) => {
  const respondMessage = {
    message: 'You do not have access',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${respondMessage.message}</message>`;
    responseXML = `${responseXML}</response>`;

    return respond(request, response, 403, responseXML, 'text/xml');
  }

  const JSONstring = JSON.stringify(respondMessage);

  return respond(request, response, 403, JSONstring, 'application/json');
};

const internal = (request, response, acceptedTypes) => {
  const respondMessage = {
    message: 'Internal server error',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${respondMessage.message}</message>`;
    responseXML = `${responseXML}</response>`;

    return respond(request, response, 500, responseXML, 'text/xml');
  }

  const JSONstring = JSON.stringify(respondMessage);

  return respond(request, response, 500, JSONstring, 'application/json');
};

const notImplemented = (request, response, acceptedTypes) => {
  const respondMessage = {
    message: 'Get request for this page not implemented yet',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${respondMessage.message}</message>`;
    responseXML = `${responseXML}</response>`;

    return respond(request, response, 501, responseXML, 'text/xml');
  }

  const JSONstring = JSON.stringify(respondMessage);

  return respond(request, response, 501, JSONstring, 'application/json');
};

const notFound = (request, response) => {
  const respondMessage = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };

  // JSON as default, user will never be able to ask for xml
  const JSONstring = JSON.stringify(respondMessage);

  return respond(request, response, 404, JSONstring, 'application/json');
};

module.exports = {
  success,
  badRequest,
  notFound,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
};
